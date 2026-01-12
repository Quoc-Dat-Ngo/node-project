const pool = require('./pool');

const read_all_tasks = async () => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks');
    return rows;
  } catch (e) {
    console.error('Fail to retrieve all active tasks.', e);
  }
};

const read_single_task = async id => {
  try {
    // Method 1 (Indirect):
    // const tasks = await read_all_tasks();
    // console.log(tasks);
    // console.log(id);
    // const task_to_return = tasks.find(task => task.id === id);

    // Method 2 (Direct):
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [
      id,
    ]);
    return rows;
  } catch (e) {
    console.error(`Fail to retrieve the task with given id ${id}`);
  }
};

module.exports = { read_all_tasks, read_single_task };
