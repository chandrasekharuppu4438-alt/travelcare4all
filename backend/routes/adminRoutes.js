const express = require('express');
const router = express.Router();
const { verifyAdminToken } = require('../middleware/auth');
const {
  getDashboardStats,
  getAdminBookings,
  updateBookingStatus,
  updateBookingNotes,
  getAdminVisa,
  updateVisaStatus,
  getAdminEnquiries,
  updateEnquiryStatus,
  createPackage,
  updatePackage,
  deletePackage
} = require('../controllers/adminController');

// All admin routes require valid admin authentication
router.use(verifyAdminToken);

// Dashboard overview
router.get('/dashboard', getDashboardStats);

// Bookings
router.get('/bookings', getAdminBookings);
router.patch('/bookings/:id/status', updateBookingStatus);
router.patch('/bookings/:id/notes', updateBookingNotes);

// Visa enquiries
router.get('/visa', getAdminVisa);
router.patch('/visa/:id/status', updateVisaStatus);

// Custom trip & General enquiries CRM
router.get('/enquiries', getAdminEnquiries);
router.patch('/enquiries/:id/status', updateEnquiryStatus);

// Packages (Tours) management
router.post('/packages', createPackage);
router.patch('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

module.exports = router;
