const VisaInquiry = require('../models/VisaInquiry');
const { isDBConnected } = require('../config/db');

let inMemoryVisaInquiries = [];

const submitVisaInquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      destination,
      visaType,
      travelDate,
      applicantCount = 1,
      message = ''
    } = req.body;

    if (!name || !phone || !destination || !visaType) {
      return res.status(400).json({
        success: false,
        message: 'Applicant name, contact phone, destination country, and visa type are required.'
      });
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid 10-digit mobile number for WhatsApp assistance.'
      });
    }

    const inquiryId = 'VISA-' + Math.floor(100000 + Math.random() * 900000);

    // 1. Persistent MongoDB Storage
    if (isDBConnected()) {
      const inquiry = await VisaInquiry.create({
        inquiryId,
        name: name.trim(),
        email: email ? email.trim().toLowerCase() : '',
        phone: phone.trim(),
        destination: destination.trim(),
        visaType,
        travelDate: travelDate || '',
        applicantCount: Number(applicantCount) || 1,
        message: message.trim(),
        status: 'New',
        statusHistory: [
          { status: 'New', changedAt: new Date(), note: 'Visa inquiry submitted online' }
        ]
      });

      return res.status(201).json({
        success: true,
        message: 'Visa enquiry received! Our Fast Track Visa desk in Vijayawada will contact you shortly with the document checklist.',
        inquiry
      });
    }

    // 2. Database Disconnected Handling in Production
    if (process.env.NODE_ENV === 'production') {
      return res.status(503).json({
        success: false,
        message: 'Our visa database is temporarily unavailable. Please send your visa enquiry directly to our Visa Desk on WhatsApp (+91 73861 33399) for immediate processing.',
        canFallbackToWhatsApp: true,
        details: { name, phone, destination, visaType, travelDate }
      });
    }

    // 3. Local Development Fallback with explicit indicator
    const demoInquiry = {
      _id: 'local-visa-' + Date.now(),
      inquiryId,
      name,
      email,
      phone,
      destination,
      visaType,
      travelDate: travelDate || '',
      applicantCount: Number(applicantCount) || 1,
      message,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    inMemoryVisaInquiries.unshift(demoInquiry);

    res.set('X-Database-Fallback', 'in-memory-volatile');
    return res.status(201).json({
      success: true,
      isDemoSession: true,
      message: 'Visa enquiry registered (Development Mode - MongoDB is offline).',
      inquiry: demoInquiry
    });
  } catch (error) {
    console.error('[Visa Inquiry Error]', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while submitting your visa inquiry.'
    });
  }
};

const getVisaInquiries = async (req, res) => {
  try {
    if (isDBConnected()) {
      const inquiries = await VisaInquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: inquiries.length, inquiries });
    }
    return res.json({ success: true, count: inMemoryVisaInquiries.length, inquiries: inMemoryVisaInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve visa inquiries.' });
  }
};

module.exports = { submitVisaInquiry, getVisaInquiries };
