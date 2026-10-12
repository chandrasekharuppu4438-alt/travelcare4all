const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB, getDBStatus } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const tourRoutes = require('./routes/tourRoutes');
const destinationRoutes = require('./routes/destinationRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const visaRoutes = require('./routes/visaRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB (non-blocking)
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/visa', visaRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDBStatus();
  res.json({
    status: 'ok',
    service: 'Travel Care 4 All API',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    authSystem: 'Active (JWT + bcrypt)',
    adminEndpoints: '/api/admin'
  });
});

// Root welcome
app.get('/', (req, res) => {
  res.json({
    name: 'Travel Care 4 All MERN Backend API',
    version: '1.0.0',
    status: 'online',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/login',
      admin: '/api/admin/dashboard',
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
  res.status(404).json({ success: false, message: `API Route not found: ${req.method} ${req.originalUrl}` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Travel Care 4 All API running on http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Admin Auth: http://localhost:${PORT}/api/auth/login`);
  console.log(`📊 Admin Operations: http://localhost:${PORT}/api/admin/dashboard`);
  console.log(`📦 Tours Endpoint: http://localhost:${PORT}/api/tours`);
  console.log(`🏝️ Destinations: http://localhost:${PORT}/api/destinations`);
  console.log(`✈️ Fast Track Visa: http://localhost:${PORT}/api/visa`);
  console.log(`======================================================\n`);
});
