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
    ).rejects.toThrow('Title must be a string');
  });

  // Active is null
  test('throws error if missing active status', async () => {
    await expect(
      createNewTask({ title: 'Learn Rust', description: 'test' }),
    ).rejects.toThrow('Active status must be a boolean value');
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

  // Title is empty
  test('throws error if title is empty string', async () => {
    await expect(
      createNewTask({ title: '', active: true, description: '' }),
    ).rejects.toThrow('Title must be a string');
  });

  // Description is empty
  test('Description is allowed to be empty string', async () => {
    await expect(
      createNewTask({ title: 'Test', active: true, description: '' }),
    ).resolves.toEqual({
      id: 1,
      title: 'Test',
      active: true,
      description: '',
    });
  });

  // Wrong data type for title
  test('Wrong data type for title', async () => {
    await expect(
      createNewTask({ title: 1, active: true, description: 'test' }),
    ).rejects.toThrow('Title must be a string');
  });

  // Wrong data type for active
  test('Wrong data type for active', async () => {
    await expect(
      createNewTask({ title: 'test', active: 'true', description: 'test' }),
    ).rejects.toThrow('Active status must be a boolean value');
  });

  // Wrong data type for description
  test('Wrong data type for description', async () => {
    await expect(
      createNewTask({ title: 'test', active: true, description: 2 }),
    ).rejects.toThrow('Description must be a string or an undefined value');
  });
});
