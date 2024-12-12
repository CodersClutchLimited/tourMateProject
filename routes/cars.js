const express = require('express');
const router = express.Router();
const cars = require('../controllers/cars')

router.get("/", cars.getCars);
router.get("/show", cars.showCars);

module.exports = router;