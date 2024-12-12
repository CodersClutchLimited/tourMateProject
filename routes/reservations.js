const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const Reservation = require('../models/reservation');
const { isLoggedIn } = require('../middleware'); // Middleware to ensure user is logged in

// POST route to make a reservation
router.post('/campgrounds/:id/reservation', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);

    const { startDate, endDate, numberOfGuests } = req.body;

    // Check for conflicting reservations or manual unavailable dates
    const conflictingReservations = await Reservation.find({
        campground: id,
        $or: [
            { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
        ]
    });

    const conflictingManualDates = campground.manualUnavailableDates.some(date =>
        (startDate <= date && endDate >= date)
    );

    if (conflictingReservations.length > 0 || conflictingManualDates) {
        req.flash('error', 'The campground is already booked or unavailable for the selected dates.');
        return res.redirect(`/campgrounds/${id}`);
    }

    // Calculate the number of days for the reservation
    const start = new Date(startDate);
    const end = new Date(endDate);
    let numberOfDays = (end - start) / (1000 * 60 * 60 * 24); // Difference in days

    // Ensure at least 1 day for a one-night stay
    if (numberOfDays < 1) {
        numberOfDays = 1;
    }

    // Calculate the total cost
    const totalCost = campground.price * numberOfGuests * numberOfDays;

    // If available, create a new reservation
    const reservation = new Reservation({
        campground: id,
        user: req.user._id,
        startDate: start,
        endDate: end,
        numberOfGuests,
        totalCost
    });

    try {
        await reservation.save(); // Save reservation first

        campground.reservations.push(reservation._id); // Push reservation ID to campground
        await campground.save(); // Save updated campground

        req.flash('success', 'Your reservation was successful!');
    } catch (error) {
        req.flash('error', 'An error occurred while processing your reservation.');
        console.error('Error:', error); // Log error for debugging
    }

    res.redirect(`/campgrounds/${id}`);
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const Campground = require('../models/campground');
// const Reservation = require('../models/reservation');
// const { isLoggedIn } = require('../middleware');

// router.post('/campgrounds/:id/reservation', isLoggedIn, async (req, res) => {
//     const { id } = req.params;
//     const campground = await Campground.findById(id);

//     const { startDate, endDate, numberOfGuests } = req.body;

//     const conflictingReservations = await Reservation.find({
//         campground: id,
//         $or: [
//             { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
//         ]
//     });

//     const conflictingManualDates = campground.manualUnavailableDates.some(date =>
//         (startDate <= date && endDate >= date)
//     );

//     if (conflictingReservations.length > 0 || conflictingManualDates) {
//         req.flash('error', 'The campground is already booked or unavailable for the selected dates.');
//         return res.redirect(`/campgrounds/${id}`);
//     }

//     const reservation = new Reservation({
//         campground: id,
//         user: req.user._id,
//         startDate : new Date(startDate),
//         endDate : new Date(endDate),
//         numberOfGuests,
//         totalCost: campground.price * numberOfGuests * ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) // Total cost calculation
//     }); 
    
//     try {
//         await reservation.save();

//         campground.reservations.push(reservation._id);
//         await campground.save();

//         req.flash('success', 'Your reservation was successful!');
//     } catch (error) {
//         req.flash('error', 'An error occurred while processing your reservation.');
//         console.error('Error:', error);
//     }
//     res.redirect(`/campgrounds/${id}`);
// });


// module.exports = router;
