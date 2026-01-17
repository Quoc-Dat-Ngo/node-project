const pool = require('../database/pool');

const readAllTasks = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  } catch (e) {
    throw e;
  }
};

const readSingleTask = async id => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [
      id,
    ]);
    return rows;
  } catch (e) {
    throw e;
  }
};

const createNewTask = async body => {
  try {
    console.log(body);
    await pool.query(
      'INSERT INTO tasks (title, active, description) VALUES ($1, DEFAULT, $2);',
      [body.title, body.description],
    );
  } catch (e) {
    throw e;
  }
};

const updateTask = async (id, body) => {
  try {
    const update = await pool.query(
      'UPDATE tasks SET title = $1, active = $2, description = $3 WHERE id = $4',
      [body.title, body.active, body.description, id],
    );
    return update;
  } catch (e) {
    throw e;
  }
};

const deleteSingleTask = async id => {
  try {
    const del = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return del;
  } catch (e) {
    throw e;
  }
};

module.exports = {
  readAllTasks,
  readSingleTask,
  createNewTask,
  updateTask,
  deleteSingleTask,
};
