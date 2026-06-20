// ============================================
// src/routes/userRoutes.js
// RESTful Route Mapping — Pillar 3
// ============================================
// POST   /api/users        → createUser
// GET    /api/users        → getAllUsers
// GET    /api/users/:id    → getUserById
// PUT    /api/users/:id    → updateUser
// DELETE /api/users/:id    → deleteUser
// ============================================

const express    = require('express');
const router     = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const {
  createUserRules,
  updateUserRules,
  handleValidationErrors,
} = require('../middleware/validate');

// CREATE
router.post('/', createUserRules, handleValidationErrors, createUser);

// READ ALL  (supports ?role=admin and ?search=aarav)
router.get('/', getAllUsers);

// READ ONE
router.get('/:id', getUserById);

// UPDATE
router.put('/:id', updateUserRules, handleValidationErrors, updateUser);

// DELETE
router.delete('/:id', deleteUser);

module.exports = router;
