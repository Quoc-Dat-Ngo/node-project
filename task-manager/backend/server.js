require('dotenv/config');
const app = require('./app');
const initDb = require('./src/database/init');
const pool = require('./src/database/pool');

const port = process.env.PORT || 3003;

// Initialise new database
initDb();

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});

// When users press CTRL+C to shutdown the server, gracefully shutdown...
process.on('SIGINT', async () => {
  console.log('Shutting down...');
  await pool.end();
  server.close(() => process.exit(0));
});
