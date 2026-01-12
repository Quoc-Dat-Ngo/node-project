const pool = require('./pool');

const initDb = async () => {
  try {
    // await pool.query('DROP TABLE IF EXISTS tasks;');

    await pool.query(`
    	CREATE TABLE IF NOT EXISTS tasks (
    		id SERIAL PRIMARY KEY,
    		title VARCHAR(255) NOT NULL,
				active BOOLEAN DEFAULT TRUE,
    		description TEXT
				);`);
    console.log('Create new table for managing tasks');
  } catch (e) {
    console.error('Fail to initialise database', e);
  }
};

module.exports = initDb;
