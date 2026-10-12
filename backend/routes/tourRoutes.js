const express = require('express');
const router = express.Router();
const { getTours, getTourBySlug, getFeaturedTours } = require('../controllers/tourController');

router.get('/', getTours);
router.get('/featured', getFeaturedTours);
router.get('/:slug', getTourBySlug);

module.exports = router;
