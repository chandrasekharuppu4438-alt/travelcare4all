const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travelcare4all';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Could not connect to MongoDB (${error.message}).`);
    console.warn(`[MongoDB Notice] Operating in resilient InMemory/Hybrid mode with full seed data.`);
    return false;
  }
};

const getDBStatus = () => ({
  connected: isConnected,
  host: isConnected ? mongoose.connection.host : 'in-memory-fallback',
  database: isConnected ? mongoose.connection.name : 'travelcare4all'
});

module.exports = { connectDB, getDBStatus, isDBConnected: () => isConnected };
