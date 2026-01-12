const express = require('express');
const tasks = require('./routes/tasks');
const initDb = require('./database/init');
const pool = require('./database/pool');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3003;

// Initialise new database
initDb();

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

const server = app.listen(
  port,
  console.log(`Server is listening on port ${port}...`),
);

// When users press CTRL+C to shutdown the server
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await pool.end();
  server.end(() => process.exit(0));
});
