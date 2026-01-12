const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteSingleTask,
} = require('../controllers/tasks');

router.route('/').get(getAllTasks).post(createTask);
router
  .route('/:id')
  .get(getSingleTask)
  .patch(updateTask)
  .delete(deleteSingleTask);

module.exports = router;
