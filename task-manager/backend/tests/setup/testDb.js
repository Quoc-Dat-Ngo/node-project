const pool = require('../../src/database/pool');
const fs = require('fs');
const path = require('path');

// Run all SQL migration files in /migrations
const migrate = async () => {
  const migrationDir = path.join(__dirname, '../../migrations');
  const files = fs.readdirSync(migrationDir);

  for (const file of files) {
    const filePath = path.join(migrationDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');
    await pool
      .query(sql)
      .then(() => console.log('Migration OK'))
      .catch(err => {
        console.error('Migration FAILED:', err);
        throw err;
      });
  }
};

const resetTables = async () => {
  await pool.query('TRUNCATE TABLE tasks RESTART IDENTITY CASCADE');
};

const closePool = async () => {
  await pool.end();
};

module.exports = {
  migrate,
  resetTables,
  closePool,
};
