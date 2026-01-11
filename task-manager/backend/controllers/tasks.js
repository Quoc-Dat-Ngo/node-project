const { read_all_tasks } = require('../database/read_tasks');
const create_new_task = require('../database/write_tasks');

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

const getSingleTask = (req, res) => {
  const { id } = req.params;
  res.send(`Info about the selected task number ${id}`);
};

const updateSingleTask = (req, res) => {
  const { id } = req.params;
  res.send(`Update the selected task ${id}`);
};

const deleteSingleTask = (req, res) => {
  const { id } = req.params;
  res.send(`Delete the selected task ${id}`);
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
