const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Tour = require('../models/Tour');
const Destination = require('../models/Destination');
const Admin = require('../models/Admin');
const seedData = require('../data/seedData');

const seedDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelcare4all';
  try {
    console.log(`Connecting to MongoDB at: ${uri}`);
    await mongoose.connect(uri);
    console.log('Connected to MongoDB successfully!');

    // 1. Seed Tours
    await Tour.deleteMany({});
    await Tour.insertMany(seedData.tours);
    console.log(`✓ Seeded ${seedData.tours.length} Tour packages`);

    // 2. Seed Destinations
    await Destination.deleteMany({});
    await Destination.insertMany(seedData.destinations);
    console.log(`✓ Seeded ${seedData.destinations.length} Destinations`);

    // 3. Seed Initial Administrator Account
    const adminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@travelcare4all.com').toLowerCase().trim();
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@TravelCare2026';
    const adminName = process.env.INITIAL_ADMIN_NAME || 'B. Vidya Sagar';

    await Admin.deleteMany({ email: adminEmail });
    await Admin.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: 'superadmin',
      isActive: true
    });
    console.log(`✓ Initial Administrator created: ${adminEmail}`);

    console.log('\n======================================================');
    console.log('🎉 Database seeding complete!');
    console.log(`🔐 Admin Login: ${adminEmail}`);
    console.log(`🔑 Default Password configured from .env`);
    console.log('======================================================\n');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
