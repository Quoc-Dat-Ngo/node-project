const getAllTasks = (req, res) => {
  res.send('All items from the database');
};

const createTask = (req, res) => {
  res.send('New Task');
};

const getSingleTask = (req, res) => {
  const { id } = req.params;
  res.send('Info about the selected task');
};

const updateSingleTask = (req, res) => {
  const { id } = req.params;
  res.send('Update the selected task');
};

const deleteSingleTask = (req, res) => {
  const { id } = req.params;
  res.send('Delete the selected task');
};

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateSingleTask,
  deleteSingleTask,
};
