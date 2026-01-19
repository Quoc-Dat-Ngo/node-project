const { createNewTask } = require('../../src/services/taskService');

describe('taskService.createNewTask', () => {
  // Happy path: valid input
  test('Success case, creates and returns the new task', async () => {
    const result = await createNewTask({
      title: 'Learn Rust',
      active: true,
      description: 'Learn fearless concurrency in Rust',
    });
    expect(result).toMatchObject({
      id: expect.any(Number),
      title: 'Learn Rust',
      active: true,
      description: 'Learn fearless concurrency in Rust',
    });
  });

  // Edge case: description omitted
  test('Success case, creates task without description', async () => {
    const result = await createNewTask({
      title: 'Learn Rust',
      active: true,
    });
    expect(result).toMatchObject({
      title: 'Learn Rust',
      active: true,
      description: null,
    });
  });

  // Error case: DB failure
  test('throws error on DB insert failure', async () => {
    const mockPool = require('../../src/database/pool');
    mockPool.query = jest.fn().mockRejectedValue(new Error('DB Error'));
    await expect(
      createNewTask({ title: 'Fail', active: true, description: 'test' }),
    ).rejects.toThrow('DB Error');
  });
});
