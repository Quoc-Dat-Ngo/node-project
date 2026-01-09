const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const port = 3000;

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
