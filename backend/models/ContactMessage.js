const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, default: 'General Enquiry' },
  message: { type: String, required: true },
  travelType: { type: String },
  destination: { type: String },
  status: { type: String, default: 'Unread' }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
