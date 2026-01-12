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
    // Method 1 (Indirect):
    // const tasks = await readAllTasks();
    // console.log(tasks);
    // console.log(id);
    // const task_to_return = tasks.find(task => task.id === id);

    // Method 2 (Direct):
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
      'INSERT INTO tasks (title, active, description) VALUES ($1, $2, $3);',
      [body.title, body.active, body.description],
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
