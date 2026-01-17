const { closePool } = require('./testDb');

module.exports = async () => {
  await closePool();
};
