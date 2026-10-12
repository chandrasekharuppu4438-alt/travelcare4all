const VisaInquiry = require('../models/VisaInquiry');
const { isDBConnected } = require('../config/db');

let inMemoryVisaInquiries = [
  {
    _id: 'visa-demo-1',
    inquiryId: 'VISA-391024',
    name: 'Srinivasa Rao',
    phone: '+91 94401 23456',
    destination: 'Dubai',
    visaType: 'Tourist Visa',
    travelDate: '2026-11-20',
    status: 'In Review',
    createdAt: new Date().toISOString()
  }
];

const submitVisaInquiry = async (req, res) => {
  try {
    const { name, phone, destination, visaType, travelDate } = req.body;

    if (!name || !phone || !destination || !visaType) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, destination, and visa type are required.'
      });
    }

    const inquiryId = 'VISA-' + Math.floor(100000 + Math.random() * 900000);

    if (isDBConnected()) {
      const inquiry = await VisaInquiry.create({
        inquiryId,
        name,
        phone,
        destination,
        visaType,
        travelDate: travelDate || ''
      });
      return res.status(201).json({
        success: true,
        message: 'Visa enquiry submitted! Our Fast Track Visa desk will call you or WhatsApp you shortly.',
        inquiry
      });
    }

    const inquiry = {
      _id: 'local-visa-' + Date.now(),
      inquiryId,
      name,
      phone,
      destination,
      visaType,
      travelDate: travelDate || '',
      status: 'New',
      createdAt: new Date().toISOString()
    };
    inMemoryVisaInquiries.unshift(inquiry);

    res.status(201).json({
      success: true,
      message: 'Visa enquiry submitted! Our Fast Track Visa desk will call you or WhatsApp you shortly.',
      inquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getVisaInquiries = async (req, res) => {
  try {
    if (isDBConnected()) {
      const list = await VisaInquiry.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: list.length, inquiries: list });
    }
    res.json({ success: true, count: inMemoryVisaInquiries.length, inquiries: inMemoryVisaInquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitVisaInquiry,
  getVisaInquiries
};
