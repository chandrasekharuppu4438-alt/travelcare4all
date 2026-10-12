const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    default: () => 'TC4A-' + Math.floor(100000 + Math.random() * 900000)
  },
  tourSlug: { type: String, required: true },
  tourTitle: { type: String, required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelDate: { type: String, required: true },
  travellers: { type: Number, default: 2, min: 1 },
  specialRequests: { type: String },
  totalAmount: { type: Number },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Contacted', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);
