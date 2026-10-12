const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  enquiryId: {
    type: String,
    unique: true,
    default: () => 'ENQ-' + Math.floor(100000 + Math.random() * 900000)
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  source: {
    type: String,
    default: 'Website General'
  },
  destination: {
    type: String,
    default: ''
  },
  tourSlug: {
    type: String,
    default: ''
  },
  travelType: {
    type: String,
    default: 'Holiday'
  },
  travelDate: {
    type: String,
    default: ''
  },
  travellers: {
    type: Number,
    default: 2,
    min: 1
  },
  budget: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Quotation Sent', 'Follow-up', 'Converted', 'Closed'],
    default: 'New'
  },
  internalNotes: {
    type: String,
    default: ''
  },
  followUpDate: {
    type: Date
  },
  statusHistory: [{
    status: String,
    changedAt: { type: Date, default: Date.now },
    note: String
  }]
}, {
  timestamps: true
});

enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model('Enquiry', enquirySchema);
