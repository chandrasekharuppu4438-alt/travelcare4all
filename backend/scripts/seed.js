const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Tour = require('../models/Tour');
const Destination = require('../models/Destination');
const seedData = require('../data/seedData');

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelcare4all';
  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri);
    console.log('Connected to MongoDB!');

    // Clear existing
    await Tour.deleteMany({});
    await Destination.deleteMany({});
    console.log('Cleared existing Tours and Destinations');

    // Insert seeds
    await Tour.insertMany(seedData.tours);
    console.log(`Successfully seeded ${seedData.tours.length} Tours!`);

    await Destination.insertMany(seedData.destinations);
    console.log(`Successfully seeded ${seedData.destinations.length} Destinations!`);

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
