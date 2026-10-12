const Destination = require('../models/Destination');
const seedData = require('../data/seedData');
const { isDBConnected } = require('../config/db');

let inMemoryDestinations = [...seedData.destinations];

const getDestinations = async (req, res) => {
  try {
    const { region, featured } = req.query;

    if (isDBConnected()) {
      let query = {};
      if (region) query.region = region;
      if (featured !== undefined) query.featured = featured === 'true';

      const destinations = await Destination.find(query);
      return res.json({ success: true, count: destinations.length, destinations });
    }

    let results = [...inMemoryDestinations];
    if (region) results = results.filter(d => d.region === region);
    if (featured !== undefined) {
      const isFeat = featured === 'true';
      results = results.filter(d => !!d.featured === isFeat);
    }

    res.json({ success: true, count: results.length, destinations: results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getDestinationBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (isDBConnected()) {
      const destination = await Destination.findOne({ slug });
      if (destination) return res.json({ success: true, destination });
    }

    const fallback = inMemoryDestinations.find(d => d.slug === slug);
    if (!fallback) {
      return res.status(404).json({ success: false, message: 'Destination not found' });
    }
    res.json({ success: true, destination: fallback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDestinations,
  getDestinationBySlug
};
