// ./app.js

const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Middleware
app.use(express.json());

// Routes
app.use('/whisper', userRoutes);

// Error handler (should be after all routes)
app.use(errorHandler);

module.exports = app;
