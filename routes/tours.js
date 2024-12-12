const express = require('express');
const router = express.Router();
const tours = require('../controllers/tours')

router.get("/", tours.getTours);

module.exports = router;