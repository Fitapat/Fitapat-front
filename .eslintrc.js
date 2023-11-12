module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    eqeqeq: 'error',
    'no-console': 'warn',
    'no-dupe-args': 'error',
    'no-unreachable': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'import/extensions': 'off',
  },
  'linebreak-style': [
    'error',
    // eslint-disable-next-line global-require
    require('os').EOL === '\r\n' ? 'windows' : 'unix',
  ],
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
};
