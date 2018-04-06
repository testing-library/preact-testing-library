module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'simple-import-sort',
  ],
  rules: {
    'max-len': ['warn', {'code': 100}],
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off',
    'simple-import-sort/sort': 'error',
    'class-methods-use-this': 'off',
    'no-unused-vars': 'off',
    'max-classes-per-file': 'off',
  },
  globals: {
    document: 'readonly',
    window: 'readonly',
  }
};
