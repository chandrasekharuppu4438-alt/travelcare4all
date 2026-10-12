const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB, getDBStatus } = require('./config/db');
const tourRoutes = require('./routes/tourRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const visaRoutes = require('./routes/visaRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (non-blocking)
connectDB();

// API Routes
app.use('/api/tours', tourRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/visa', visaRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Travel Care 4 All API',
    timestamp: new Date().toISOString(),
    database: getDBStatus()
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Travel Care 4 All MERN Backend API',
    endpoints: {
      health: '/api/health',
      tours: '/api/tours',
      destinations: '/api/destinations',
      bookings: '/api/bookings',
      visa: '/api/visa',
      siteInfo: '/api/contact/info'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Travel Care 4 All API running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📦 Tours Endpoint: http://localhost:${PORT}/api/tours`);
  console.log(`🏝️ Destinations: http://localhost:${PORT}/api/destinations`);
  console.log(`✈️ Fast Track Visa: http://localhost:${PORT}/api/visa`);
  console.log(`======================================================\n`);
});
