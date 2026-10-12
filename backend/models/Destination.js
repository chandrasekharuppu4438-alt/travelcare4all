const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  region: { type: String, enum: ['International', 'Domestic'], required: true },
  image: { type: String, required: true },
  featured: { type: Boolean, default: false },
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Destination', destinationSchema);
