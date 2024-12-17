const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const catchAsync = require('../Utils/catchAsync');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn,isCarAuthor, isAuthor, validateCar } = require('../middleware');
const Car = require('../models/car');
const cars = require('../controllers/cars')

router.route("/")
    .get(catchAsync(cars.index))
    .post(isLoggedIn, upload.array('images', 10), validateCar, catchAsync(cars.createCar));



router.get('/new', isLoggedIn, cars.renderNewForm);


router.route('/:id')
        .get(catchAsync(cars.showCar))
        .put(isLoggedIn, isCarAuthor, upload.array('image'), validateCar, catchAsync(cars.updateCar))
        .delete(isLoggedIn, isCarAuthor, catchAsync(cars.deleteCar));


router.get('/:id/edit', isLoggedIn, isCarAuthor, catchAsync(cars.renderEditForm))

module.exports = router;