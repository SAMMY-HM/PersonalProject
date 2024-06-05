// Backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
const generateResumeRoutes = require('./routes/generateResume');
const errorHandler = require('./middleware/errorHandler'); // Import error handler

const app = express();
const PORT = process.env.PORT || 8000;

// Use CORS middleware for frontend and backend running on different ports
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', contactRoutes);
app.use('/api', generateResumeRoutes);

// Error handler middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
