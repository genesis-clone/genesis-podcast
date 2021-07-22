module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
<<<<<<< HEAD
<<<<<<< HEAD
  plugins: ['@typescript-eslint/eslint-plugin'],
=======
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
>>>>>>> 2a8320876be55f49fa9bca70740c8e49952918d9
=======
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
>>>>>>> 2a8320876be55f49fa9bca70740c8e49952918d9
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
<<<<<<< HEAD
<<<<<<< HEAD
=======
    'prettier/prettier': 'error',
>>>>>>> 2a8320876be55f49fa9bca70740c8e49952918d9
=======
    'prettier/prettier': 'error',
>>>>>>> 2a8320876be55f49fa9bca70740c8e49952918d9
  },
};
