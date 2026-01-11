const pool = require('./pool');

const create_new_task = async (body) => {
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

module.exports = create_new_task;
