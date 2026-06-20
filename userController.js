// ============================================
// src/controllers/userController.js
// Pillar 3: The Action (CRUD & RESTful HTTP)
// ============================================
// CREATE  → POST   → SQL INSERT
// READ    → GET    → SQL SELECT
// UPDATE  → PUT    → SQL UPDATE
// DELETE  → DELETE → SQL DELETE
// ============================================

const { pool } = require('../config/db');

// ─────────────────────────────────────────────
// CREATE — POST /api/users
// ─────────────────────────────────────────────
const createUser = async (req, res) => {
  try {
    const { name, email, age, role = 'user' } = req.body;

    // Parameterized query — Prevents SQL Injection (Pillar 4)
    const sql = `
      INSERT INTO users (name, email, age, role)
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await pool.execute(sql, [name, email, age, role]);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id:    result.insertId,
        name,
        email,
        age,
        role,
      },
    });
  } catch (err) {
    // Handle duplicate email (UNIQUE constraint violation)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists. Use a different email.',
      });
    }
    console.error('createUser error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ─────────────────────────────────────────────
// READ ALL — GET /api/users
// ─────────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;

    let sql    = 'SELECT id, name, email, age, role, created_at FROM users WHERE 1=1';
    const params = [];

    // Optional filter by role
    if (role) {
      sql += ' AND role = ?';
      params.push(role);
    }

    // Optional search by name or email
    if (search) {
      sql += ' AND (name LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    sql += ' ORDER BY created_at DESC';

    const [rows] = await pool.execute(sql, params);

    return res.status(200).json({
      success: true,
      count:   rows.length,
      data:    rows,
    });
  } catch (err) {
    console.error('getAllUsers error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ─────────────────────────────────────────────
// READ ONE — GET /api/users/:id
// ─────────────────────────────────────────────
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'SELECT id, name, email, age, role, created_at FROM users WHERE id = ?';
    const [rows] = await pool.execute(sql, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: `User with id ${id} not found` });
    }

    return res.status(200).json({ success: true, data: rows[0] });
  } catch (err) {
    console.error('getUserById error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ─────────────────────────────────────────────
// UPDATE — PUT /api/users/:id
// ─────────────────────────────────────────────
const updateUser = async (req, res) => {
  try {
    const { id }                            = req.params;
    const { name, email, age, role }        = req.body;

    // Build dynamic SET clause (only update provided fields)
    const fields = [];
    const params = [];

    if (name)  { fields.push('name = ?');  params.push(name);  }
    if (email) { fields.push('email = ?'); params.push(email); }
    if (age)   { fields.push('age = ?');   params.push(age);   }
    if (role)  { fields.push('role = ?');  params.push(role);  }

    if (fields.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided to update' });
    }

    params.push(id); // WHERE id = ?
    const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
    const [result] = await pool.execute(sql, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: `User with id ${id} not found` });
    }

    return res.status(200).json({ success: true, message: `User ${id} updated successfully` });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, message: 'Email already exists.' });
    }
    console.error('updateUser error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// ─────────────────────────────────────────────
// DELETE — DELETE /api/users/:id
// ─────────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const sql = 'DELETE FROM users WHERE id = ?';
    const [result] = await pool.execute(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: `User with id ${id} not found` });
    }

    return res.status(200).json({ success: true, message: `User ${id} deleted successfully` });
  } catch (err) {
    console.error('deleteUser error:', err.message);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
