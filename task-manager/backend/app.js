const express = require('express');
const tasks = require('./src/routes/tasks');
const morgan = require('morgan');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('Task Manager App');
});

// Routes for handling API endpoints
app.use('/api/v1/tasks', tasks);

// Apply a global error handler middleware
app.use(errorHandler);

module.exports = app;
