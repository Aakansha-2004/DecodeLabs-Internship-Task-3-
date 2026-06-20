// ============================================
// src/middleware/validate.js
// Pillar 4: The Shield (Integrity & Security)
// ============================================

const { body, validationResult } = require('express-validator');

// Validation rules for creating a user
const createUserRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('age')
    .notEmpty().withMessage('Age is required')
    .isInt({ min: 18 }).withMessage('Age must be 18 or above (CHECK constraint)'),

  body('role')
    .optional()
    .isIn(['admin', 'user', 'moderator']).withMessage('Role must be admin, user, or moderator'),
];

// Validation rules for updating a user (all fields optional)
const updateUserRules = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Name must be 2–100 characters'),

  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Enter a valid email address')
    .normalizeEmail(),

  body('age')
    .optional()
    .isInt({ min: 18 }).withMessage('Age must be 18 or above'),

  body('role')
    .optional()
    .isIn(['admin', 'user', 'moderator']).withMessage('Role must be admin, user, or moderator'),
];

// Middleware to check validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

module.exports = { createUserRules, updateUserRules, handleValidationErrors };
