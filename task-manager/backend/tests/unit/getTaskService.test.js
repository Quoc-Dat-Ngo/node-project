const {
  readAllTasks,
  readSingleTask,
  createNewTask,
} = require('../../src/services/taskService');

// Restore mocks after each test to avoid interference
afterEach(() => {
  jest.restoreAllMocks();
});

describe('taskService.readAllTasks', () => {
  // Happy path: no tasks
  test('Success case, no tasks in the database', async () => {
    await expect(readAllTasks()).resolves.toEqual([]);
  });

  // Happy path: some tasks
  test('Success case, some tasks in the database', async () => {
    await createNewTask({
      title: 'test1',
      active: true,
      description: 'testtest',
    });
    await createNewTask({
      title: 'test2',
      active: true,
      description: 'testtest',
    });
    await createNewTask({
      title: 'test3',
      active: true,
      description: 'testtest',
    });
    const result = await readAllTasks();
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({
      title: 'test1',
      active: true,
      description: 'testtest',
    });
  });

  // Error case: DB failure
  test('throws error on DB query failure', async () => {
    const mockPool = require('../../src/database/pool');
    const spy = jest
      .spyOn(mockPool, 'query')
      .mockRejectedValue(new Error('DB Error'));
    await expect(readAllTasks()).rejects.toThrow('DB Error');
    spy.mockRestore(); // Optional: explicit restore for safety
  });
});

describe('taskService.readSingleTask', () => {
  beforeEach(async () => {
    await createNewTask({
      title: 'test1',
      active: true,
      description: 'testtest',
    });
    await createNewTask({
      title: 'test2',
      active: true,
      description: 'testtest',
    });
  });

  // Happy path: existing task
  test('Success case, returns the task', async () => {
    const result = await readSingleTask(1);
    expect(result).toEqual([
      {
        id: 1,
        title: 'test1',
        active: true,
        description: 'testtest',
      },
    ]);
  });

  // Edge case: non-existent ID
  test('returns empty array for non-existent ID', async () => {
    const result = await readSingleTask(999);
    expect(result).toEqual([]);
  });

  // Error case: DB failure
  test('throws error on DB query failure', async () => {
    const mockPool = require('../../src/database/pool');
    const spy = jest
      .spyOn(mockPool, 'query')
      .mockRejectedValue(new Error('DB Error'));
    await expect(readSingleTask(1)).rejects.toThrow('DB Error');
    spy.mockRestore(); // Optional: explicit restore for safety
  });
});
