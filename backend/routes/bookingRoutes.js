const express = require('express');
const router = express.Router();
const { createBooking, getBookings } = require('../controllers/bookingController');
const { updateBookingStatus } = require('../controllers/adminController');

router.post('/', createBooking);
router.get('/', getBookings);
router.patch('/:id/status', updateBookingStatus);

module.exports = router;
