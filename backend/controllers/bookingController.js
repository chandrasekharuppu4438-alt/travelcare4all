const Booking = require('../models/Booking');
const { isDBConnected } = require('../config/db');

// In-memory bookings store for resilient fallback
let inMemoryBookings = [
  {
    _id: 'sample-1',
    bookingId: 'TC4A-839201',
    tourSlug: 'maldives-honeymoon',
    tourTitle: 'Maldives Honeymoon',
    customerName: 'Karthik Varma',
    email: 'karthik.v@example.com',
    phone: '+91 98480 12345',
    travelDate: '2026-11-15',
    travellers: 2,
    specialRequests: 'Beach pool villa requested & vegetarian meal plan',
    totalAmount: 179998,
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'sample-2',
    bookingId: 'TC4A-492104',
    tourSlug: 'dubai-experience',
    tourTitle: 'Dubai Highlights & Desert Safari',
    customerName: 'Praveen Kumar',
    email: 'praveen.k@example.com',
    phone: '+91 97000 54321',
    travelDate: '2026-12-05',
    travellers: 4,
    specialRequests: 'Need fast track visa processing for 2 kids',
    totalAmount: 199996,
    status: 'Pending',
    createdAt: new Date().toISOString()
  }
];

const createBooking = async (req, res) => {
  try {
    const {
      tourSlug,
      tourTitle,
      customerName,
      email,
      phone,
      travelDate,
      travellers = 2,
      specialRequests,
      totalAmount
    } = req.body;

    if (!tourSlug || !customerName || !phone || !travelDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide tour, name, phone number, and travel date.'
      });
    }

    const bookingId = 'TC4A-' + Math.floor(100000 + Math.random() * 900000);

    if (isDBConnected()) {
      const newBooking = await Booking.create({
        bookingId,
        tourSlug,
        tourTitle: tourTitle || tourSlug,
        customerName,
        email: email || '',
        phone,
        travelDate,
        travellers: Number(travellers) || 2,
        specialRequests,
        totalAmount: Number(totalAmount) || 0
      });

      return res.status(201).json({
        success: true,
        message: 'Booking request registered successfully! Our team will contact you shortly.',
        booking: newBooking
      });
    }

    // In-memory fallback
    const newBooking = {
      _id: 'local-' + Date.now(),
      bookingId,
      tourSlug,
      tourTitle: tourTitle || tourSlug,
      customerName,
      email: email || '',
      phone,
      travelDate,
      travellers: Number(travellers) || 2,
      specialRequests,
      totalAmount: Number(totalAmount) || 0,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    inMemoryBookings.unshift(newBooking);

    res.status(201).json({
      success: true,
      message: 'Booking request registered successfully! Our team will contact you shortly.',
      booking: newBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getBookings = async (req, res) => {
  try {
    if (isDBConnected()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, bookings });
    }
    res.json({ success: true, count: inMemoryBookings.length, bookings: inMemoryBookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (isDBConnected()) {
      const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
      if (booking) return res.json({ success: true, booking });
    }

    const idx = inMemoryBookings.findIndex(b => b._id === id || b.bookingId === id);
    if (idx !== -1) {
      inMemoryBookings[idx].status = status;
      return res.json({ success: true, booking: inMemoryBookings[idx] });
    }

    res.status(404).json({ success: false, message: 'Booking not found' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createBooking,
  getBookings,
  updateBookingStatus
};
