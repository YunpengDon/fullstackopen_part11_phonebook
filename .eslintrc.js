module.exports = {
  'env': {
    //'nodenpm install --save-dev @stylistic/eslint-plugin-js': true,
    'node': true,
    'commonjs': true,
    'es2021': true
  },
  'plugins': [
    '@stylistic/js'
  ],
  'extends': 'eslint:recommended',
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      },
    },
    {
      'files': ['e2e/**/*.js','playwright.config.js'],
      'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
      },
      'env': {
        'node': true,
        'es6': true
      },
    }
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    '@stylistic/js/indent': [
      'error',
      2
    ],
    '@stylistic/js/linebreak-style': [
      'error',
      'unix'
    ],
    '@stylistic/js/quotes': [
      'error',
      'single'
    ],
    '@stylistic/js/semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
  }
}
