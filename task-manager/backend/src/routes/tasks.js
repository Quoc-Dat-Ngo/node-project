const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteSingleTask,
} = require('../controllers/tasks');

const bodyValidate = require('../middleware/bodyValidate');
const paramValidate = require('../middleware/paramValidate');

const bodySchema = require('../utils/bodySchema');
const paramSchema = require('../utils/paramSchema');

router.route('/').get(getAllTasks).post(createTask);
router
  .route('/:id')
  .get(paramValidate(paramSchema), getSingleTask)
  .patch(paramValidate(paramSchema), bodyValidate(bodySchema), updateTask)
  .delete(paramValidate(paramSchema), deleteSingleTask);

module.exports = router;
