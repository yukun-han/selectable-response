/** @type {import('jest').Config} */

export default {
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm',
  transform: {
    '^.+\\.[t]s?$': ['ts-jest', { useESM: true }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'tests/coverage',
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['clover', 'lcov', 'text', 'json-summary'],
  maxWorkers: 1,
  setupFilesAfterEnv: ['<rootDir>/tests/support/setup-jest.ts'],
};
