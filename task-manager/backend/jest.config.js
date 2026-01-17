module.exports = {
  setupFiles: ['<rootDir>/tests/setup/testEnv.js'],
  globalSetup: '<rootDir>/tests/setup/globalSetup.js',
  globalTeardown: '<rootDir>/tests/setup/globalTeardown.js',
  setupFilesAfterEnv: ['<rootDir>/tests/setup/setupEach.js'],
};
