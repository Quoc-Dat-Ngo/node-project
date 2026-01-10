const _ = require('dotenv/config');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

const init_db = async () => {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS tasks;');

    await client.query(`
    	CREATE TABLE IF NOT EXISTS tasks (
    		id SERIAL PRIMARY KEY,
    		title VARCHAR(255) NOT NULL,
				active BOOLEAN DEFAULT TRUE,
    		description TEXT
				);`);
    console.log('Create new table for managing tasks');
  } catch (e) {
    console.error('Fail to initialise database', e);
  } finally {
    client.release();
    pool.end();
  }
};

module.exports = init_db;
