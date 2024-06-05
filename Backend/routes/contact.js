// Backend/routes/contact.js
const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/contact', [
  check('name').notEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('message').notEmpty().withMessage('Message is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, contactController.submitForm);

module.exports = router;
