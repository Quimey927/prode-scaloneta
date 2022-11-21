const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthor, isAdmin } = require('../middleware');
const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');

router.get('/:id', catchAsync(players.showProde));

router.get('/:id/editar', isLoggedIn, isAuthor, isAdmin, catchAsync(players.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, isAdmin, catchAsync(players.updateProde));

module.exports = router;