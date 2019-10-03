module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: [
    "standard"
  ],
  plugins: [
    'simple-import-sort',
    'react-hooks'
  ],
  rules: {
    'max-len': ['warn', {'code': 100}],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off'
  }
};
