// ============================================
// src/config/db.js — MySQL Connection Pool
// Pillar 2: The Bridge (Integration & Connection)
// ============================================

const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool (better than single connection)
const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               process.env.DB_PORT     || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'user_management_db',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Test connection on startup
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ MySQL Connected Successfully!');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL Connection Failed:', err.message);
    process.exit(1); // Stop server if DB is not reachable
  }
};

module.exports = { pool, testConnection };
