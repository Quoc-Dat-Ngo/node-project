const express = require('express');
const tasks = require('./routes/tasks');
const init_db = require('./database/init');
const pool = require('./database/pool');

const app = express();
const port = 3000;

// Initialise new database
init_db();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Task Manager App');
});

app.use('/api/v1/tasks', tasks);

// Get all tasks
app.get('/api/v1/tasks', (req, res) => {});

// Create a new task
app.post('/api/v1/tasks', (req, res) => {});

// Get info about a single task
app.get('/api/v1/tasks/:id', (req, res) => {});

// Update a task
app.patch('/api/v1/tasks/:id', (req, res) => {});

// Delete a task
app.delete('/api/v1/tasks/:id', (req, res) => {});

app.listen(port, console.log(`Server is listening on port ${port}...`));

// When users press CTRL+C to shutdown the server
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await pool.end();
  server.close(() => process.exit(0));
});
