module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'linebreak-style': 0,
    'import/prefer-default-export': 'off',
    'comma-dangle': 'off',
    'no-alert': 'off',
    'react/no-unescaped-entities': 'off',
    'no-console': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'object-curly-newline': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'object-shorthand': 'off',
    'operator-linebreak': 'off',
    'prefer-arrow-callback': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
