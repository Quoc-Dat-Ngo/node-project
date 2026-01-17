const { resetTables } = require('./testDb');

beforeEach(async () => {
  await resetTables();
});
