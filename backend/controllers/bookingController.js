const Booking = require('../models/Booking');
const { isDBConnected } = require('../config/db');

let inMemoryBookings = [];

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
      specialRequests = '',
      totalAmount = 0
    } = req.body;

    if (!tourSlug || !customerName || !phone || !travelDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide tour, full name, phone number, and travel date.'
      });
    }

    // Validate phone number format (at least 10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid phone number with at least 10 digits.'
      });
    }

    const bookingId = 'TC4A-' + Math.floor(100000 + Math.random() * 900000);

    // 1. Persistent MongoDB Storage
    if (isDBConnected()) {
      const booking = await Booking.create({
        bookingId,
        tourSlug,
        tourTitle,
        customerName: customerName.trim(),
        email: email ? email.trim().toLowerCase() : `${phoneDigits}@travelcare4all.guest`,
        phone: phone.trim(),
        travelDate,
        travellers: Number(travellers) || 2,
        specialRequests,
        totalAmount: Number(totalAmount) || 0,
        status: 'Pending',
        statusHistory: [
          { status: 'Pending', changedAt: new Date(), note: 'Booking enquiry submitted online' }
        ]
      });

      return res.status(201).json({
        success: true,
        message: 'Your booking enquiry has been registered! Our team will contact you shortly to confirm arrangements.',
        booking
      });
    }

    // 2. Database Disconnected Handling
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        message: 'Our reservation system is currently undergoing scheduled maintenance. Please connect directly via WhatsApp at +91 73861 33399 so our Vijayawada desk can confirm your booking without delay.',
        canFallbackToWhatsApp: true,
        bookingDetails: {
          tourTitle,
          customerName,
          phone,
          travelDate,
          travellers
        }
      });
    }

    // 3. Local Development Mode with explicit transparency
    const demoBooking = {
      _id: 'local-demo-' + Date.now(),
      bookingId,
      tourSlug,
      tourTitle,
      customerName,
      email: email || '',
      phone,
      travelDate,
      travellers: Number(travellers) || 2,
      specialRequests,
      totalAmount,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    inMemoryBookings.unshift(demoBooking);

    res.set('X-Database-Fallback', 'in-memory-volatile');
    return res.status(201).json({
      success: true,
      isDemoSession: true,
      message: 'Booking enquiry recorded (Development Mode - MongoDB is offline. Connect MongoDB Atlas to persist permanently).',
      booking: demoBooking
    });
  } catch (error) {
    console.error('[Create Booking Error]', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while submitting your booking enquiry.'
    });
  }
};

const getBookings = async (req, res) => {
  try {
    if (isDBConnected()) {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, bookings });
    }
    return res.json({ success: true, count: inMemoryBookings.length, bookings: inMemoryBookings });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve bookings.' });
  }
};

module.exports = { createBooking, getBookings };
