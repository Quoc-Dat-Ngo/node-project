const pool = require('../database/pool');
const AppError = require('../utils/AppError');

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
    if (!body.title || typeof body.title !== 'string')
      throw new AppError('Title must be a string', 400);
    if (body.title.trim() === '')
      throw new AppError('Title can not be empty', 400);
    if (typeof body.active !== 'boolean')
      throw new AppError('Active status must be a boolean value', 400);
    if (!['undefined', 'string'].includes(typeof body.description))
      throw new AppError(
        'Description must be a string or an undefined value',
        400,
      );

    // console.log(body);
    const result = await pool.query(
      'INSERT INTO tasks (title, active, description) VALUES ($1, $2, $3) RETURNING *;',
      [body.title, body.active, body.description],
    );

    return result.rows[0];
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
