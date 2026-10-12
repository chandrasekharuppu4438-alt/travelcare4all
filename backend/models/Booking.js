const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    index: true,
    default: () => 'TC4A-' + Math.floor(100000 + Math.random() * 900000)
  },
  tourSlug: { type: String, required: true },
  tourTitle: { type: String, required: true },
  customerName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  travelDate: { type: String, required: true },
  travellers: { type: Number, default: 2, min: 1 },
  specialRequests: { type: String, default: '' },
  totalAmount: { type: Number, default: 0 },
  quotedAmount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
    default: 'Pending',
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

bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);
