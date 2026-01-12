const pool = require('./pool');

const delete_single_task = async id => {
  try {
    const del = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return del;
  } catch (e) {
    console.error(`Fail to delete a task with given id ${id}`, e);
  }
};

module.exports = delete_single_task;
