module.exports = async () => {
  const { migrate } = require('./testDb');
  await migrate();
};
