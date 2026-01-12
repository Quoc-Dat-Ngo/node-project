const {
  readAllTasks,
  readSingleTask,
  createNewTask,
  updateTask: updateTaskService,
  deleteSingleTask: deleteTaskService,
} = require('../services/taskService');
const NotFoundError = require('../utils/NotFoundError');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await readAllTasks();
    res.json(tasks);
  } catch (e) {
    next(e);
  }
};

const createTask = async (req, res) => {
  try {
    await createNewTask(req.body);
    res.json(req.body);
  } catch (e) {
    next(e);
  }
};

const getSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await readSingleTask(id);
    console.log(task);
    if (!task.length) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    res.json(task[0]);
  } catch (e) {
    next(e);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const update = await updateTaskService(id, req.body);
    console.log(update);
    if (!update.rowCount) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    res.json({ status: 'Successfully updated' });
  } catch (e) {
    next(e);
  }
};

const deleteSingleTask = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await deleteTaskService(id);
    console.log(del);
    if (!del.rowCount) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    res.json({ status: `Sucessfully deleted the task with given id ${id}` });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteSingleTask,
};
