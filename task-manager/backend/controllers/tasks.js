const getAllTasks = (req, res) => {
  res.send('All items from the database');
};

const createTask = (req, res) => {
  res.json(req.body);
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
