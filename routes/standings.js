const express = require('express');
const router = express.Router();
const standings = require('../controllers/standings');
const catchAsync = require('../utils/catchAsync');

router.get('/posiciones', catchAsync(standings.standings));

module.exports = router;