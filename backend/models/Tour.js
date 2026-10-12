const mongoose = require('mongoose');

const itineraryStepSchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }
}, { _id: false });

const tourSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  destinationSlug: { type: String, required: true },
  country: { type: String, required: true, trim: true },
  travelType: { type: String, required: true }, // "International Tour", "Domestic Tour", "Honeymoon", "Pilgrimage", etc.
  packageType: { type: String, enum: ['International', 'Domestic'], required: true },
  days: { type: Number, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  currency: { type: String, default: 'INR' },
  rating: { type: Number, default: 4.8 },
  reviews: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  popular: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: true, index: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  hotel: { type: String },
  shortDescription: { type: String, required: true },
  overview: { type: String, required: true },
  highlights: [{ type: String }],
  itinerary: [itineraryStepSchema],
  hotels: [{ type: String }],
  transportation: { type: String },
  meals: { type: String },
  inclusions: [{ type: String }],
  exclusions: [{ type: String }]
}, {
  timestamps: true
});

tourSchema.index({ title: 'text', destination: 'text', country: 'text', shortDescription: 'text' });
tourSchema.index({ price: 1 });
tourSchema.index({ days: 1 });

module.exports = mongoose.model('Tour', tourSchema);
