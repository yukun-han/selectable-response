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
  coverageDirectory: 'tests/coverage',
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  collectCoverage: true,
  maxWorkers: 1,
};
