require('dotenv').config({ path: `${__dirname}/../../.env.test` });

module.exports = async () => {
  const { migrate } = require('./testDb');
  await migrate();
  console.log('running');
};
