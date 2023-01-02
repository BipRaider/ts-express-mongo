import type { Config } from '@jest/types';
import { defaults } from 'jest-config';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  displayName: 'test',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'js'],
  coverageDirectory: './coverage',
  transform: {
    '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
  },
  // testRegex: '.e2e.spec.ts$',
  testMatch: [
    '**/test/e2e/index.spec.ts',
    //'**/test/crash/index.spec.ts',
    //'**/test/e2e/**/*.(test|spec).(ts|js)'
  ],
};

export default config;
