// Backend/controllers/contactController.js
const db = require('../models/database');
const logger = require('../utils/logger');
const sendEmail = require('../utils/emailService');

exports.submitForm = (req, res) => {
  const { name, email, message } = req.body;

  const query = `INSERT INTO messages (name, email, message) VALUES (?, ?, ?)`;
  db.query(query, [name, email, message], (err, results) => {
    if (err) {
      logger.error(err);
      res.status(500).json({ success: false, message: 'Failed to save message' });
    } else {
      res.json({ success: true, message: 'Message saved successfully' });

      // Send email notification to yourself
      const subject = 'New Contact Form Submission';
      const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
      sendEmail('sammyhm69@gmail.com', subject, text)
        .then(() => logger.info('Email sent successfully'))
        .catch(error => logger.error('Error sending email:', error));
    }
  });
};
