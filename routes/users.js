const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn, isAdmin } = require('../middleware');
const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');

router.get('/registrar', isAdmin, users.renderRegisterForm);

router.post('/registrar', isAdmin, catchAsync(users.register));

router.get('/login', users.renderLoginForm);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.get('/logout', users.logout); 

router.get('/password', isLoggedIn, users.renderPasswordForm);

router.post('/password', isLoggedIn, catchAsync(users.createNewPassword));

module.exports = router;