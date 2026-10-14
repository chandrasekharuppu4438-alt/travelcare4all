const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

let isConnected = false;

const connectDB = async () => {
  let uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('travelcare4all_admin') || uri.includes('<db_password>') || uri.includes('127.0.0.1')) {
    uri = 'mongodb+srv://Travelcare_db:Bethamvidyasagar200426@travelcare4all.5uwf1eb.mongodb.net/travelcare4all?retryWrites=true&w=majority&appName=Travelcare4all';
  }
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000
    });
    isConnected = true;
    let displayHost = conn.connection.host;
    try {
      const match = uri.match(/@([^/?]+)/);
      if (match && match[1]) displayHost = match[1];
    } catch {}
    console.log(`[MongoDB] Connected successfully: ${displayHost} (database: ${conn.connection.name})`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] Could not connect to MongoDB (${error.message}).`);
    console.warn(`[MongoDB Notice] Operating in resilient InMemory/Hybrid mode with full seed data.`);
    return false;
  }
};

const getDBStatus = () => {
  let displayHost = 'in-memory-fallback';
  if (isConnected) {
    try {
      const uri = process.env.MONGODB_URI || '';
      const match = uri.match(/@([^/?]+)/);
      displayHost = (match && match[1]) ? match[1] : mongoose.connection.host;
    } catch {
      displayHost = mongoose.connection.host;
    }
  }
  return {
    connected: isConnected,
    host: displayHost,
    database: isConnected ? mongoose.connection.name : 'travelcare4all'
  };
};

module.exports = { connectDB, getDBStatus, isDBConnected: () => isConnected };
