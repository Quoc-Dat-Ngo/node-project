const { createNewTask } = require('../../src/services/taskService');

describe('taskService.createNewTask', () => {
  // Happy path
  test('Success case, function return the insert row', async () => {
    await expect(
      createNewTask({
        title: 'Learn Rust',
        active: true,
        description: 'Learn fearless concurrency in Rust',
      }),
    ).resolves.toEqual({
      id: 1,
      title: 'Learn Rust',
      active: true,
      description: 'Learn fearless concurrency in Rust',
    });
  });

  // Title is null
  test('throws error if missing a title', async () => {
    await expect(
      createNewTask({ active: true, description: 'test' }),
    ).rejects.toThrow(/null value in column "title"/);
  });

  // Active is null
  test('throws error if missing active status', async () => {
    await expect(
      createNewTask({ title: 'Learn Rust', description: 'test' }),
    ).rejects.toThrow(/null value in column "active"/);
  });

  // Description is null (aceptable)
  test('sucess even if missing a description', async () => {
    await expect(
      createNewTask({ title: 'Learn Rust', active: true }),
    ).resolves.toEqual({
      id: 1,
      title: 'Learn Rust',
      active: true,
      description: null,
    });
  });

  // test('throws error if title is empty string', async () => {
  //   await expect(
  //     createNewTask({ title: '', active: true, description: '' }),
  //   ).rejects.toThrow();
  // });
});
