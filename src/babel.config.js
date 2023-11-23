module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['lcov', 'text-summary'],
};