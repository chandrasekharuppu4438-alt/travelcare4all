const Tour = require('../models/Tour');
const Destination = require('../models/Destination');
const Booking = require('../models/Booking');
const VisaInquiry = require('../models/VisaInquiry');
const Enquiry = require('../models/Enquiry');
const seedData = require('../data/seedData');
const { isDBConnected } = require('../config/db');

// In-memory data structures for development fallback when MongoDB is offline
let inMemoryTours = [...seedData.tours];
let inMemoryBookings = [
  {
    _id: 'mock-b-1',
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
    quotedAmount: 179998,
    status: 'Confirmed',
    internalNotes: 'Deposit received via UPI. Flight tickets issued.',
    statusHistory: [
      { status: 'Pending', changedAt: new Date(Date.now() - 86400000 * 3), note: 'Submitted via website' },
      { status: 'Confirmed', changedAt: new Date(), note: 'Confirmed with resort' }
    ],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    _id: 'mock-b-2',
    bookingId: 'TC4A-492104',
    tourSlug: 'dubai-experience',
    tourTitle: 'Dubai Highlights & Desert Safari',
    customerName: 'Praveen Kumar',
    email: 'praveen.k@example.com',
    phone: '+91 97000 54321',
    travelDate: '2026-12-05',
    travellers: 4,
    specialRequests: 'Need fast track visa processing for 2 children',
    totalAmount: 199996,
    quotedAmount: 195000,
    status: 'Pending',
    internalNotes: 'Called customer on 12th Oct. Waiting for passport copies.',
    statusHistory: [
      { status: 'Pending', changedAt: new Date(), note: 'Website booking request' }
    ],
    createdAt: new Date().toISOString()
  }
];

let inMemoryVisa = [
  {
    _id: 'mock-v-1',
    inquiryId: 'VISA-391024',
    name: 'Srinivasa Rao',
    email: 'srinivas.rao@example.com',
    phone: '+91 94401 23456',
    destination: 'Dubai',
    visaType: 'Tourist Visa (30 Days)',
    travelDate: '2026-11-20',
    applicantCount: 2,
    message: 'Express processing needed. Travel in 3 weeks.',
    status: 'In Review',
    internalNotes: 'Documents verified. Submitting to UAE portal.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: 'mock-v-2',
    inquiryId: 'VISA-718293',
    name: 'Ananya Reddy',
    email: 'ananya.r@example.com',
    phone: '+91 98499 87654',
    destination: 'Singapore',
    visaType: 'Tourist e-Visa',
    travelDate: '2026-12-10',
    applicantCount: 3,
    message: 'Family vacation. Need assistance with photo specifications.',
    status: 'New',
    internalNotes: 'Sent WhatsApp checklist on 12th Oct.',
    createdAt: new Date().toISOString()
  }
];

let inMemoryEnquiries = [
  {
    _id: 'mock-e-1',
    enquiryId: 'ENQ-918201',
    customerName: 'Dr. Ramesh Naidu',
    email: 'ramesh.naidu@example.com',
    phone: '+91 98481 99887',
    source: 'Custom Trip Planner',
    destination: 'Europe / Switzerland & Paris',
    travelType: 'Customized Holiday',
    travelDate: '2026-12-24',
    travellers: 4,
    budget: '₹4,00,000 - ₹5,00,000',
    message: 'Looking for a 10-day private family tour including Jungfrau and Disneyland Paris.',
    status: 'Quotation Sent',
    internalNotes: 'Custom itinerary PDF sent over WhatsApp. Follow-up scheduled for 15th Oct.',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// 1. GET /api/admin/dashboard
const getDashboardStats = async (req, res) => {
  try {
    if (isDBConnected()) {
      const [
        totalBookings,
        pendingBookings,
        confirmedBookings,
        totalVisa,
        newVisa,
        totalEnquiries,
        newEnquiries,
        packagesCount
      ] = await Promise.all([
        Booking.countDocuments(),
        Booking.countDocuments({ status: 'Pending' }),
        Booking.countDocuments({ status: 'Confirmed' }),
        VisaInquiry.countDocuments(),
        VisaInquiry.countDocuments({ status: 'New' }),
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: 'New' }),
        Tour.countDocuments()
      ]);

      const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
      const recentVisa = await VisaInquiry.find().sort({ createdAt: -1 }).limit(5);
      const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

      return res.json({
        success: true,
        stats: {
          totalBookings,
          pendingBookings,
          confirmedBookings,
          totalVisa,
          newVisa,
          totalEnquiries,
          newEnquiries,
          packagesCount,
          isLiveDB: true
        },
        recent: {
          bookings: recentBookings,
          visa: recentVisa,
          enquiries: recentEnquiries
        }
      });
    }

    // In-memory fallback
    res.json({
      success: true,
      stats: {
        totalBookings: inMemoryBookings.length,
        pendingBookings: inMemoryBookings.filter(b => b.status === 'Pending').length,
        confirmedBookings: inMemoryBookings.filter(b => b.status === 'Confirmed').length,
        totalVisa: inMemoryVisa.length,
        newVisa: inMemoryVisa.filter(v => v.status === 'New').length,
        totalEnquiries: inMemoryEnquiries.length,
        newEnquiries: inMemoryEnquiries.filter(e => e.status === 'New').length,
        packagesCount: inMemoryTours.length,
        isLiveDB: false
      },
      recent: {
        bookings: inMemoryBookings.slice(0, 5),
        visa: inMemoryVisa.slice(0, 5),
        enquiries: inMemoryEnquiries.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('[Admin Dashboard Stats Error]', error);
    res.status(500).json({ success: false, message: 'Failed to calculate dashboard statistics.' });
  }
};

// 2. Bookings Management
const getAdminBookings = async (req, res) => {
  try {
    const { status, search } = req.query;

    if (isDBConnected()) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { customerName: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { bookingId: { $regex: search, $options: 'i' } },
          { tourTitle: { $regex: search, $options: 'i' } }
        ];
      }
      const bookings = await Booking.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: bookings.length, bookings });
    }

    let results = [...inMemoryBookings];
    if (status && status !== 'All') results = results.filter(b => b.status === status);
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(b =>
        b.customerName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.bookingId.toLowerCase().includes(q) ||
        b.tourTitle.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, count: results.length, bookings: results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch bookings.' });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, note } = req.body;

    const allowed = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    if (isDBConnected()) {
      const booking = await Booking.findOne({ $or: [{ _id: id }, { bookingId: id }] });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });

      booking.status = status;
      if (note) {
        booking.statusHistory.push({ status, note, changedAt: new Date() });
      }
      await booking.save();
      return res.json({ success: true, message: `Status updated to ${status}`, booking });
    }

    const booking = inMemoryBookings.find(b => b._id === id || b.bookingId === id);
    if (booking) {
      booking.status = status;
      if (!booking.statusHistory) booking.statusHistory = [];
      booking.statusHistory.push({ status, note: note || '', changedAt: new Date() });
      return res.json({ success: true, message: `Status updated to ${status}`, booking });
    }
    res.status(404).json({ success: false, message: 'Booking not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update booking status.' });
  }
};

const updateBookingNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const { internalNotes, quotedAmount } = req.body;

    if (isDBConnected()) {
      const booking = await Booking.findOne({ $or: [{ _id: id }, { bookingId: id }] });
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found.' });

      if (internalNotes !== undefined) booking.internalNotes = internalNotes;
      if (quotedAmount !== undefined) booking.quotedAmount = Number(quotedAmount);
      await booking.save();
      return res.json({ success: true, message: 'Booking notes saved.', booking });
    }

    const booking = inMemoryBookings.find(b => b._id === id || b.bookingId === id);
    if (booking) {
      if (internalNotes !== undefined) booking.internalNotes = internalNotes;
      if (quotedAmount !== undefined) booking.quotedAmount = Number(quotedAmount);
      return res.json({ success: true, message: 'Booking notes saved.', booking });
    }
    res.status(404).json({ success: false, message: 'Booking not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update booking notes.' });
  }
};

// 3. Visa Management
const getAdminVisa = async (req, res) => {
  try {
    const { status, search } = req.query;

    if (isDBConnected()) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { inquiryId: { $regex: search, $options: 'i' } },
          { destination: { $regex: search, $options: 'i' } }
        ];
      }
      const inquiries = await VisaInquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, inquiries });
    }

    let results = [...inMemoryVisa];
    if (status && status !== 'All') results = results.filter(v => v.status === status);
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.phone.includes(q) ||
        v.inquiryId.toLowerCase().includes(q) ||
        v.destination.toLowerCase().includes(q)
      );
    }
    res.json({ success: true, count: results.length, inquiries: results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch visa inquiries.' });
  }
};

const updateVisaStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, internalNotes } = req.body;

    if (isDBConnected()) {
      const item = await VisaInquiry.findOne({ $or: [{ _id: id }, { inquiryId: id }] });
      if (!item) return res.status(404).json({ success: false, message: 'Visa inquiry not found.' });

      if (status) item.status = status;
      if (internalNotes !== undefined) item.internalNotes = internalNotes;
      await item.save();
      return res.json({ success: true, message: 'Visa inquiry updated.', inquiry: item });
    }

    const item = inMemoryVisa.find(v => v._id === id || v.inquiryId === id);
    if (item) {
      if (status) item.status = status;
      if (internalNotes !== undefined) item.internalNotes = internalNotes;
      return res.json({ success: true, message: 'Visa inquiry updated.', inquiry: item });
    }
    res.status(404).json({ success: false, message: 'Visa inquiry not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update visa inquiry.' });
  }
};

// 4. Custom Enquiries CRM
const getAdminEnquiries = async (req, res) => {
  try {
    const { status, search } = req.query;

    if (isDBConnected()) {
      let query = {};
      if (status && status !== 'All') query.status = status;
      if (search) {
        query.$or = [
          { customerName: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } },
          { enquiryId: { $regex: search, $options: 'i' } },
          { destination: { $regex: search, $options: 'i' } }
        ];
      }
      const enquiries = await Enquiry.find(query).sort({ createdAt: -1 });
      return res.json({ success: true, count: enquiries.length, enquiries });
    }

    let results = [...inMemoryEnquiries];
    if (status && status !== 'All') results = results.filter(e => e.status === status);
    if (search) {
      const q = search.toLowerCase();
      results = results.filter(e =>
        e.customerName.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.enquiryId.toLowerCase().includes(q) ||
        (e.destination && e.destination.toLowerCase().includes(q))
      );
    }
    res.json({ success: true, count: results.length, enquiries: results });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch enquiries.' });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, internalNotes, followUpDate } = req.body;

    if (isDBConnected()) {
      const enquiry = await Enquiry.findOne({ $or: [{ _id: id }, { enquiryId: id }] });
      if (!enquiry) return res.status(404).json({ success: false, message: 'Enquiry not found.' });

      if (status) enquiry.status = status;
      if (internalNotes !== undefined) enquiry.internalNotes = internalNotes;
      if (followUpDate !== undefined) enquiry.followUpDate = followUpDate;
      await enquiry.save();
      return res.json({ success: true, message: 'Enquiry record updated.', enquiry });
    }

    const enquiry = inMemoryEnquiries.find(e => e._id === id || e.enquiryId === id);
    if (enquiry) {
      if (status) enquiry.status = status;
      if (internalNotes !== undefined) enquiry.internalNotes = internalNotes;
      if (followUpDate !== undefined) enquiry.followUpDate = followUpDate;
      return res.json({ success: true, message: 'Enquiry record updated.', enquiry });
    }
    res.status(404).json({ success: false, message: 'Enquiry not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update enquiry.' });
  }
};

// 5. Package Management (Create, Edit, Publish/Unpublish, Delete)
const createPackage = async (req, res) => {
  try {
    const data = req.body;

    if (!data.title || !data.destination || !data.price || !data.days) {
      return res.status(400).json({
        success: false,
        message: 'Title, destination, price, and days are required fields.'
      });
    }

    const slug = data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (isDBConnected()) {
      const existing = await Tour.findOne({ slug });
      if (existing) {
        return res.status(400).json({ success: false, message: 'A package with this slug already exists.' });
      }
      const newTour = await Tour.create({ ...data, slug });
      return res.status(201).json({ success: true, message: 'Package created successfully.', tour: newTour });
    }

    const newTour = {
      ...data,
      _id: 'local-tour-' + Date.now(),
      slug
    };
    inMemoryTours.unshift(newTour);
    res.status(201).json({ success: true, message: 'Package created (demo mode).', tour: newTour });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Failed to create tour package.' });
  }
};

const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isDBConnected()) {
      const tour = await Tour.findOneAndUpdate(
        { $or: [{ _id: id }, { slug: id }] },
        updates,
        { new: true, runValidators: true }
      );
      if (!tour) return res.status(404).json({ success: false, message: 'Tour package not found.' });
      return res.json({ success: true, message: 'Tour package updated.', tour });
    }

    const index = inMemoryTours.findIndex(t => t._id === id || t.slug === id);
    if (index !== -1) {
      inMemoryTours[index] = { ...inMemoryTours[index], ...updates };
      return res.json({ success: true, message: 'Tour package updated.', tour: inMemoryTours[index] });
    }
    res.status(404).json({ success: false, message: 'Tour package not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Failed to update tour package.' });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDBConnected()) {
      const tour = await Tour.findOneAndDelete({ $or: [{ _id: id }, { slug: id }] });
      if (!tour) return res.status(404).json({ success: false, message: 'Tour package not found.' });
      return res.json({ success: true, message: 'Tour package deleted successfully.' });
    }

    const initialLen = inMemoryTours.length;
    inMemoryTours = inMemoryTours.filter(t => t._id !== id && t.slug !== id);
    if (inMemoryTours.length < initialLen) {
      return res.json({ success: true, message: 'Tour package deleted.' });
    }
    res.status(404).json({ success: false, message: 'Tour package not found.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete tour package.' });
  }
};

module.exports = {
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
};
