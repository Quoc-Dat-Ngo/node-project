require('dotenv/config');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

const read_all_tasks = async () => {
  const client = await pool.connect();
  try {
    const { rows } = await client.query('SELECT * FROM tasks');
    return rows;
  } catch (e) {
    console.error('Fail to retrieve all active tasks', e);
  } finally {
    client.release();
    pool.end();
  }
};

module.exports = read_all_tasks;
