const Campground = require('../models/campground');
const Reservation = require('../models/reservation');

// Create a new reservation
module.exports.createReservation = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }

    // Ensure these fields are being sent from the form
    const { startDate, endDate, numberOfGuests, specialRequest } = req.body.reservation;

    // Validate required fields
    if (!startDate || !endDate || !numberOfGuests) {
        req.flash('error', 'Please provide all required fields.');
        return res.redirect(`/campgrounds/${id}`);
    }

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    // Check if the selected dates overlap with existing reservations
    const existingReservations = await Reservation.find({
        campground: id,
        endDate: { $gte: startDateObj },
        startDate: { $lte: endDateObj }
    });

    if (existingReservations.length > 0) {
        req.flash('error', 'Selected dates are unavailable due to existing reservations.');
        return res.redirect(`/campgrounds/${id}`);
    }

    // Check if the selected dates overlap with manually set unavailable dates
    const unavailableDates = campground.manualUnavailableDates.filter(unavailable => {
        return (
            (unavailable.startDate <= endDateObj && unavailable.endDate >= startDateObj)
        );
    });

    if (unavailableDates.length > 0) {
        req.flash('error', 'Selected dates are unavailable due to host settings.');
        return res.redirect(`/campgrounds/${id}`);
    }

    // Calculate total cost
    const days = Math.ceil((endDateObj - startDateObj) / (1000 * 60 * 60 * 24));
    const totalCost = days * campground.price * numberOfGuests;

    // Create the reservation if all checks pass
    const reservation = new Reservation({
        startDate: startDateObj,
        endDate: endDateObj,
        numberOfGuests,
        specialRequest,
        totalCost, // Remove this from form input
        user: req.user._id,
        campground: id
    });

    await reservation.save();
    campground.reservations.push(reservation._id);
    await campground.save();
    
    req.flash('success', 'Your reservation has been made successfully!');
    res.redirect(`/campgrounds/${id}`);
};