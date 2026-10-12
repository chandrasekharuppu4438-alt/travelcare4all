const mongoose = require('mongoose');

const visaInquirySchema = new mongoose.Schema({
  inquiryId: {
    type: String,
    unique: true,
    index: true,
    default: () => 'VISA-' + Math.floor(100000 + Math.random() * 900000)
  },
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, default: '' },
  phone: { type: String, required: true, trim: true },
  destination: { type: String, required: true },
  visaType: { type: String, required: true },
  travelDate: { type: String, default: '' },
  applicantCount: { type: Number, default: 1, min: 1 },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['New', 'In Review', 'Docs Received', 'Processed', 'Completed', 'Rejected'],
    default: 'New',
    index: true
  },
  internalNotes: {
    type: String,
    default: ''
  },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    note: String
  }]
}, {
  timestamps: true
});

visaInquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('VisaInquiry', visaInquirySchema);
