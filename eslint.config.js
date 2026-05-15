import js from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // Node.js globals
        global: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __filename: 'readonly',
        __dirname: 'readonly',
        // CommonJS globals
        require: 'readonly',
        module: 'readonly',
        exports: 'readonly',
        // Jest globals
        describe: 'readonly',
        test: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      }
    },
    plugins: {
      jest: jest
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jest.configs.recommended.rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-conditional-expect': 'error',
      'jest/no-identical-title': 'error'
    }
  }
];
