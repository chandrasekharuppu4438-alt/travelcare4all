const ContactMessage = require('../models/ContactMessage');
const seedData = require('../data/seedData');
const { isDBConnected } = require('../config/db');

let inMemoryMessages = [];

const submitContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, travelType, destination } = req.body;

    if (!name || !message || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Name, message, and at least email or phone number are required.'
      });
    }

    if (isDBConnected()) {
      const msg = await ContactMessage.create({
        name,
        email: email || '',
        phone: phone || '',
        subject: subject || 'General Enquiry',
        message,
        travelType: travelType || '',
        destination: destination || ''
      });
      return res.status(201).json({
        success: true,
        message: 'Thank you! Your message has been received. Our Vijayawada team will contact you shortly.',
        contact: msg
      });
    }

    const msg = {
      _id: 'msg-' + Date.now(),
      name,
      email: email || '',
      phone: phone || '',
      subject: subject || 'General Enquiry',
      message,
      travelType: travelType || '',
      destination: destination || '',
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    inMemoryMessages.unshift(msg);

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received. Our Vijayawada team will contact you shortly.',
      contact: msg
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSiteInfo = (req, res) => {
  res.json({
    success: true,
    siteConfig: seedData.siteConfig,
    services: seedData.services,
    whyChooseUs: seedData.whyChooseUs,
    stats: seedData.stats,
    visaServices: seedData.visaServices,
    reviews: seedData.reviews,
    faqs: seedData.faqs,
    gallery: seedData.gallery
  });
};

module.exports = {
  submitContactMessage,
  getSiteInfo
};
