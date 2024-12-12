const express = require('express');
const router = express.Router();
const catchAsync = require('../Utils/catchAsync');
const User = require('../models/user');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users')

router.route('/register')
//Register route
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
//login route
    .get(users.renderLogin)
    .post(storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), users.login);

//logout route
router.get('/logout', users.logout); 

module.exports = router;