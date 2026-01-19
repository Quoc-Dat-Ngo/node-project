const {
  deleteSingleTask,
  createNewTask,
} = require('../../src/services/taskService');

describe('taskService.deleteSingleTask', () => {
  let taskId;

  beforeEach(async () => {
    // Create a test task
    const task = await createNewTask({
      title: 'Test Task',
      active: true,
      description: 'For deletion',
    });
    taskId = task.id;
  });

  test('Happy path: deletes existing task successfully', async () => {
    const result = await deleteSingleTask(taskId);
    expect(result.rowCount).toBe(1); // One row deleted
  });

  test('Edge case: deleting non-existent task', async () => {
    const result = await deleteSingleTask(99999);
    expect(result.rowCount).toBe(0); // No rows affected
  });

  test('Error case: DB query fails', async () => {
    // Mock pool.query to throw
    const mockPool = require('../../src/database/pool');
    mockPool.query = jest.fn().mockRejectedValue(new Error('DB Error'));

    await expect(deleteSingleTask(taskId)).rejects.toThrow('DB Error');
  });
});
