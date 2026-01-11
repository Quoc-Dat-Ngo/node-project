const pool = require('./pool');

const read_all_tasks = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  } catch (e) {
    console.error('Fail to retrieve all active tasks', e);
  }
};

module.exports = { read_all_tasks };
