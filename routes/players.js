const express = require('express');
const router = express.Router();
const { isLoggedIn, isAuthor, isAdmin, isMissing } = require('../middleware');
const players = require('../controllers/players');
const catchAsync = require('../utils/catchAsync');

router.get('/:id', catchAsync(players.showProde));

router.get('/:id/editar', isLoggedIn, isAuthor, isMissing, catchAsync(players.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, isMissing, catchAsync(players.updateProde));

module.exports = router;