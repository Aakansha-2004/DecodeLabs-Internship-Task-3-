// ============================================
// src/index.js — Express App Entry Point
// Project 3: Database Integration
// DecodeLabs | Full Stack Development 2026
// ============================================

require('dotenv').config();
const express     = require('express');
const { testConnection } = require('./config/db');
const userRoutes  = require('./routes/userRoutes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 User Management API is running!',
    project: 'Project 3 — Database Integration',
    batch:   'DecodeLabs 2026',
    routes: {
      'POST   /api/users':        'Create a new user',
      'GET    /api/users':        'Get all users (filter: ?role=admin&search=name)',
      'GET    /api/users/:id':    'Get a single user',
      'PUT    /api/users/:id':    'Update a user',
      'DELETE /api/users/:id':    'Delete a user',
    },
  });
});

// ── API Routes ──────────────────────────────
app.use('/api/users', userRoutes);

// ── 404 Handler ─────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ success: false, message: 'Something went wrong' });
});

// ── Start Server ────────────────────────────
const startServer = async () => {
  await testConnection(); // Test DB before starting
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📦 Database: ${process.env.DB_NAME || 'user_management_db'}`);
    console.log(`📋 API docs: http://localhost:${PORT}/\n`);
  });
};

startServer();
