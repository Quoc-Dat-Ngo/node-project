const {
  readAllTasks,
  readSingleTask,
  createNewTask,
  updateTask: updateTaskService,
  deleteSingleTask: deleteTaskService,
} = require('../services/taskService');
const NotFoundError = require('../utils/NotFoundError');

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await readAllTasks();
    res.status(200).json(tasks);
  } catch (e) {
    next(e);
  }
};

const createTask = async (req, res, next) => {
  try {
    await createNewTask(req.body);
    res.status(201).json(req.body);
  } catch (e) {
    next(e);
  }
};

const getSingleTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await readSingleTask(id);
    console.log(task);
    if (!task.length) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    resv.status(200).json(task[0]);
  } catch (e) {
    next(e);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const update = await updateTaskService(id, req.body);
    console.log(update);
    if (!update.rowCount) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    res.send(201).json({ status: 'Successfully updated' });
  } catch (e) {
    next(e);
  }
};

const deleteSingleTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await deleteTaskService(id);
    console.log(del);
    if (!del.rowCount) {
      throw new NotFoundError(`Task with id ${id} not found`);
    }
    res
      .status(200)
      .json({ status: `Sucessfully deleted the task with given id ${id}` });
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
