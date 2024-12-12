const express = require('express');
const router = express.Router();
const shops = require('../controllers/shops')

router.get("/", shops.getShops);

module.exports = router;