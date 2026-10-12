const mongoose = require('mongoose');

const visaInquirySchema = new mongoose.Schema({
  inquiryId: {
    type: String,
    unique: true,
    default: () => 'VISA-' + Math.floor(100000 + Math.random() * 900000)
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  destination: { type: String, required: true },
  visaType: { type: String, required: true },
  travelDate: { type: String },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Docs Received', 'Processed'],
    default: 'New'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('VisaInquiry', visaInquirySchema);
