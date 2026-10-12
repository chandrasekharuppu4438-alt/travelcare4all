const Tour = require('../models/Tour');
const seedData = require('../data/seedData');
const { isDBConnected } = require('../config/db');

// In-memory cache copy of tours
let inMemoryTours = [...seedData.tours];

// Get all tours with comprehensive filtering & sorting
const getTours = async (req, res) => {
  try {
    const {
      search,
      destination,
      country,
      travelType,
      packageType,
      minPrice,
      maxPrice,
      duration,
      rating,
      featured,
      popular,
      sort = 'popular',
      page = 1,
      limit = 12
    } = req.query;

    if (isDBConnected()) {
      let query = {};

      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { destination: { $regex: search, $options: 'i' } },
          { country: { $regex: search, $options: 'i' } },
          { shortDescription: { $regex: search, $options: 'i' } }
        ];
      }
      if (destination) query.destination = { $regex: destination, $options: 'i' };
      if (country) query.country = { $regex: country, $options: 'i' };
      if (travelType) query.travelType = { $regex: travelType, $options: 'i' };
      if (packageType) query.packageType = packageType;
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
      if (rating) query.rating = { $gte: Number(rating) };
      if (featured !== undefined) query.featured = featured === 'true';
      if (popular !== undefined) query.popular = popular === 'true';

      if (duration) {
        if (duration === '1-3') query.days = { $lte: 3 };
        else if (duration === '4-6') query.days = { $gte: 4, $lte: 6 };
        else if (duration === '7-10') query.days = { $gte: 7, $lte: 10 };
        else if (duration === '11+') query.days = { $gte: 11 };
      }

      let sortOptions = {};
      if (sort === 'price-asc') sortOptions.price = 1;
      else if (sort === 'price-desc') sortOptions.price = -1;
      else if (sort === 'duration-asc') sortOptions.days = 1;
      else if (sort === 'rating-desc') sortOptions.rating = -1;
      else sortOptions.popular = -1;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const total = await Tour.countDocuments(query);
      const tours = await Tour.find(query).sort(sortOptions).skip(skip).limit(limitNum);

      return res.json({
        success: true,
        total,
        page: pageNum,
        totalPages: Math.ceil(total / limitNum) || 1,
        tours
      });
    }

    // Fallback: in-memory filtering
    let results = [...inMemoryTours];

    if (search) {
      const q = search.toLowerCase();
      results = results.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q) ||
        t.country.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q)
      );
    }
    if (destination) {
      results = results.filter(t => t.destination.toLowerCase().includes(destination.toLowerCase()));
    }
    if (country) {
      results = results.filter(t => t.country.toLowerCase().includes(country.toLowerCase()));
    }
    if (travelType) {
      results = results.filter(t => t.travelType.toLowerCase().includes(travelType.toLowerCase()));
    }
    if (packageType) {
      results = results.filter(t => t.packageType === packageType);
    }
    if (minPrice) {
      results = results.filter(t => t.price >= Number(minPrice));
    }
    if (maxPrice) {
      results = results.filter(t => t.price <= Number(maxPrice));
    }
    if (rating) {
      results = results.filter(t => t.rating >= Number(rating));
    }
    if (featured !== undefined) {
      const isFeat = featured === 'true';
      results = results.filter(t => !!t.featured === isFeat);
    }
    if (popular !== undefined) {
      const isPop = popular === 'true';
      results = results.filter(t => !!t.popular === isPop);
    }
    if (duration) {
      if (duration === '1-3') results = results.filter(t => t.days <= 3);
      else if (duration === '4-6') results = results.filter(t => t.days >= 4 && t.days <= 6);
      else if (duration === '7-10') results = results.filter(t => t.days >= 7 && t.days <= 10);
      else if (duration === '11+') results = results.filter(t => t.days >= 11);
    }

    if (sort === 'price-asc') results.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
    else if (sort === 'duration-asc') results.sort((a, b) => a.days - b.days);
    else if (sort === 'rating-desc') results.sort((a, b) => b.rating - a.rating);
    else results.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

    const total = results.length;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const start = (pageNum - 1) * limitNum;
    const paginated = results.slice(start, start + limitNum);

    return res.json({
      success: true,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      tours: paginated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single tour by slug
const getTourBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (isDBConnected()) {
      const tour = await Tour.findOne({ slug });
      if (tour) return res.json({ success: true, tour });
    }
    const fallbackTour = inMemoryTours.find(t => t.slug === slug);
    if (!fallbackTour) {
      return res.status(404).json({ success: false, message: 'Tour package not found' });
    }
    res.json({ success: true, tour: fallbackTour });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get featured tours
const getFeaturedTours = async (req, res) => {
  try {
    if (isDBConnected()) {
      const tours = await Tour.find({ featured: true }).limit(6);
      if (tours.length) return res.json({ success: true, tours });
    }
    const featured = inMemoryTours.filter(t => t.featured).slice(0, 6);
    res.json({ success: true, tours: featured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getTours,
  getTourBySlug,
  getFeaturedTours
};
