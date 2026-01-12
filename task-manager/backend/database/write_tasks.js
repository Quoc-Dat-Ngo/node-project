const pool = require('./pool');

const create_new_task = async body => {
  try {
    console.log(body);
    await pool.query(
      'INSERT INTO tasks (title, active, description) VALUES ($1, $2, $3);',
      [body.title, body.active, body.description],
    );
  } catch (e) {
    console.error('Fail to create new task', e);
  }
};

const update_single_task = async (id, body) => {
  try {
    const update = await pool.query(
      'UPDATE tasks SET title = $1, active = $2, description = $3 WHERE id = $4',
      [body.title, body.active, body.description, id],
    );
    return update;
  } catch (e) {
    console.error(`Fail to update a task with given id ${id}`, e);
  }
};

module.exports = { create_new_task, update_single_task };
