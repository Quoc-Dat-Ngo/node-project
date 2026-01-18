const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

console.log('POOL CONNECTED TO:', process.env.DATABASE_URL);

module.exports = pool;
