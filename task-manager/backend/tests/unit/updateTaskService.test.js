const { updateTask, createNewTask } = require('../../src/services/taskService');

describe('taskService.updateTask', () => {
  let taskId;

  beforeEach(async () => {
    // Create a test task
    const task = await createNewTask({
      title: 'Original Title',
      active: true,
      description: 'Original Desc',
    });
    taskId = task.id;
  });

  test('Happy path: updates existing task successfully', async () => {
    const result = await updateTask(taskId, {
      title: 'Updated Title',
      active: false,
      description: 'Updated Desc',
    });
    expect(result.rowCount).toBe(1); // Assuming it returns the query result
    // Optionally, verify DB state by querying again
  });

  test('Edge case: updating non-existent task', async () => {
    const result = await updateTask(99999, {
      title: 'Non-existent',
      active: true,
      description: 'Test',
    });
    expect(result.rowCount).toBe(0); // No rows affected
  });

  test('Error case: DB query fails', async () => {
    // Mock pool.query to throw
    const mockPool = require('../../src/database/pool');
    mockPool.query = jest.fn().mockRejectedValue(new Error('DB Error'));

    await expect(
      updateTask(taskId, { title: 'Fail', active: true, description: '' }),
    ).rejects.toThrow('DB Error');
  });
});
