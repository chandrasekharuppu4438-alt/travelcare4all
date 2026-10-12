const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { isDBConnected } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'travelcare4all_super_secret_jwt_key_2026_production';

// In-memory demo fallback admin for development if DB is not connected
const DEMO_ADMIN = {
  _id: 'demo-admin-id-1',
  name: 'B. Vidya Sagar',
  email: 'admin@travelcare4all.com',
  role: 'superadmin',
  isActive: true
};

const verifyAdminToken = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. No access token provided.'
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired session. Please log in again.'
      });
    }

    if (isDBConnected()) {
      const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin || !admin.isActive) {
        return res.status(403).json({
          success: false,
          message: 'Admin account not found or deactivated.'
        });
      }
      req.admin = admin;
    } else {
      // Fallback demo admin matching token
      req.admin = DEMO_ADMIN;
    }

    next();
  } catch (error) {
    console.error('[Auth Middleware Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication check failed.'
    });
  }
};

module.exports = { verifyAdminToken, JWT_SECRET, DEMO_ADMIN };
