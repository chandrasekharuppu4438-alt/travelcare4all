const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  region: { type: String, enum: ['International', 'Domestic', 'Honeymoon', 'Pilgrimage'], required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true, index: true },
  tourCount: { type: Number, default: 1 },
  tag: { type: String, default: '' },
  description: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Destination', destinationSchema);
