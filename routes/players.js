const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthor } = require('../middleware');
const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');

router.get('/:id', catchAsync(players.showProde));

router.get('/:id/editar', isLoggedIn, isAuthor, catchAsync(players.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, catchAsync(players.updateProde));

module.exports = router;