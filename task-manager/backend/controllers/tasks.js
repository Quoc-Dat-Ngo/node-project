const { read_all_tasks, read_single_task } = require('../database/read_tasks');
const {
  create_new_task,
  update_single_task,
} = require('../database/write_tasks');
const delete_single_task = require('../database/delete_tasks');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await read_all_tasks();
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: 'Fail to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  try {
    await create_new_task(req.body);
    res.json(req.body);
  } catch (e) {
    res.status(500).json({ error: 'Fail to create task' });
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await read_single_task(Number(id));
    if (!task) {
      return res
        .status(404)
        .json({ error: `Cannot find such task with given id ${id}` });
    }
    res.json(task[0]);
  } catch (e) {
    res.status(500).json({ error: `Fail to fetch a task with id: ${id}` });
  }
};

const updateSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await update_single_task();
    res.json(task);
  } catch (e) {
    res.status(500).json({ error: `Fail to update a task with id: ${id}` });
  }
};

const deleteSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await delete_single_task();
    res.json({ status: `Sucessfully deleted the task with given id ${id}` });
  } catch (e) {
    res.status(500).json({ error: `Fail to fetch a task with id ${id}` });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
