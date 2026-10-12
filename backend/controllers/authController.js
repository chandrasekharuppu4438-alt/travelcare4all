const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { isDBConnected } = require('../config/db');
const { JWT_SECRET, DEMO_ADMIN } = require('../middleware/auth');

const INITIAL_EMAIL = process.env.INITIAL_ADMIN_EMAIL || 'admin@travelcare4all.com';
const INITIAL_PASSWORD = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@TravelCare2026';

// @route   POST /api/auth/login
// @desc    Authenticate admin & return JWT
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. If MongoDB is connected
    if (isDBConnected()) {
      const admin = await Admin.findOne({ email: cleanEmail });
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.'
        });
      }

      if (!admin.isActive) {
        return res.status(403).json({
          success: false,
          message: 'This admin account has been deactivated.'
        });
      }

      const isMatch = await admin.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your email and password.'
        });
      }

      // Update last login
      admin.lastLogin = new Date();
      await admin.save();

      const token = jwt.sign(
        { id: admin._id, email: admin.email, role: admin.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        },
        message: 'Authentication successful.'
      });
    }

    // 2. Resilient fallback when MongoDB is in local development offline mode
    if (cleanEmail === INITIAL_EMAIL.toLowerCase() && password === INITIAL_PASSWORD) {
      const token = jwt.sign(
        { id: DEMO_ADMIN._id, email: DEMO_ADMIN.email, role: DEMO_ADMIN.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        token,
        admin: DEMO_ADMIN,
        isDemoSession: true,
        message: 'Logged in successfully (Development Mode - MongoDB is offline).'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Invalid credentials. Please verify your email and password.'
    });
  } catch (error) {
    console.error('[Admin Login Error]', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication.'
    });
  }
};

// @route   GET /api/auth/me
// @desc    Get current admin profile
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      admin: req.admin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin profile.'
    });
  }
};

// @route   POST /api/auth/logout
// @desc    Logout admin
const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully.'
  });
};

module.exports = { login, getMe, logout };
