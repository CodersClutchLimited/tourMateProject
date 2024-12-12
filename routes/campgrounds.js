const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const campgrounds = require('../controllers/campgrounds');
const reservations = require('../controllers/reservations');
const catchAsync = require('../Utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const Campground = require('../models/campground');
const Reservation = require('../models/reservation'); // Adjust the path as necessary


// Route to filter campgrounds by category
router.get('/category/:category', catchAsync(async (req, res) => {
    const { category } = req.params;
    const campgrounds = await Campground.find({ category });
    res.render('campgrounds/index', { campgrounds });
}));


router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))


router.get('/new', isLoggedIn, campgrounds.renderNewForm);


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// Route to check availability of a campground
router.get('/:id/check-availability', catchAsync(async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.query;

    const today = new Date();
    const reservations = await Reservation.find({
        campground: id,
        endDate: { $gte: today }
    });

    const allUnavailableDates = [
        ...reservations.map(res => ({ startDate: res.startDate, endDate: res.endDate })),
    ];

    const isAvailable = !allUnavailableDates.some(dateRange =>
        (new Date(startDate) < new Date(dateRange.endDate) && new Date(endDate) > new Date(dateRange.startDate))
    );

    res.json({ isAvailable });
}));


// New Route: Update Available Dates
router.post('/:id/update-dates', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;

    const campground = await Campground.findById(id);

    // Validate and update the available dates
    const newUnavailableDates = { startDate: new Date(startDate), endDate: new Date(endDate) };
    campground.manualUnavailableDates.push(newUnavailableDates);

    await campground.save();
    req.flash('success', 'Availability dates updated!');
    res.redirect(`/campgrounds/${id}`);
}));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

// Route to handle reservation creation
router.post('/:id/reservation', isLoggedIn, catchAsync(reservations.createReservation));

module.exports = router;