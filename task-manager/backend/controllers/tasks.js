const getAllTasks = (req, res) => {
  res.send('All items from the database');
};

const createTask = (req, res) => {
  res.send('New Task');
};

module.exports = {
  getAllTasks,
  createTask,
};
