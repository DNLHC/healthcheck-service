const bannedVariableNames = [
  'callback',
  'cb',
  'item',
  'items',
  'values',
  'val',
  'vals',
  'var',
  'vars',
  'array',
  'arr',
  'content',
  'contents',
  'handle',
  'file',
  'obj',
  'objects',
  'objs'
];

module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
    mongo: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'plugin:promise/recommended',
    'standard',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'security'
  ],
  rules: {
    // Possible Errors
    // 'comma-dangle': [2, 'never'],
    'no-constant-condition': 2,
    'no-control-regex': 2,
    'no-empty': 2,
    'no-extra-semi': 2,
    'no-extra-label': 2,
    'no-loop-func': 2,
    'valid-jsdoc': 0,
    'valid-typeof': 2,

    // // Best Practices
    'block-scoped-var': 2,
    'consistent-return': 2,
    'default-case': 2,
    'dot-notation': 2,
    'guard-for-in': 2,
    'no-div-regex': 2,
    'no-else-return': 2,
    'no-eq-null': 2,
    'no-implicit-coercion': 2,
    'no-invalid-this': 2,
    'no-native-reassign': 2,
    'no-param-reassign': 2,
    'no-script-url': 2,
    'no-useless-concat': 2,
    'no-void': 2,
    'no-warning-comments': [
      0,
      {
        terms: ['todo', 'fixme'],
        location: 'start'
      }
    ],
    'radix': 2,
    'vars-on-top': 2,

    // Strict Mode
    'strict': [2, 'never'],

    // Variables
    'init-declarations': 0,
    'no-catch-shadow': 2,
    'no-shadow': 2,
    'no-undefined': 2,

    // Node.js and CommonJS
    'callback-return': 0,
    'global-require': 0,
    'no-mixed-requires': 2,
    'no-path-concat': 2,
    'no-process-exit': 2,
    'no-restricted-modules': 0,
    'no-sync': 2,

    // Stylistic Issues
    'key-spacing': ['error', {
      beforeColon: false,
      afterColon: true
    }],
    'computed-property-spacing': ['error', 'never'],
    'max-len': ['error', {
      code: 100,
      ignoreComments: false,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true
    }],
    'id-blacklist': ['error', ...bannedVariableNames],
    'no-lonely-if': 'error',
    'max-depth': ['error', {
      max: 4
    }],
    'consistent-this': [2, 'self'],
    'func-names': 0,
    'id-length': 0,
    'id-match': 0,
    'indent': [2, 2, {
      SwitchCase: 1
    }],
    'lines-around-comment': 0,
    'linebreak-style': [2, 'unix'],
    'newline-after-var': 0,
    'no-continue': 2,
    'no-nested-ternary': 2,
    'no-restricted-syntax': 2,
    'no-spaced-func': 2,
    'no-ternary': 0,
    'no-underscore-dangle': 0,
    'operator-assignment': [2, 'always'],
    'quote-props': [2, 'as-needed'],
    'require-jsdoc': 0,

    'array-bracket-spacing': ['error', 'never'],
    'semi': ['error', 'always'],
    'max-nested-callbacks': ['error', {
      max: 3
    }],
    'sort-vars': 0,
    'wrap-regex': 0,

    // async/await
    'no-async-promise-executor': 'error',
    'require-atomic-updates': 'error',

    'prefer-rest-params': 'error',
    'object-shorthand': 'error',
    'prefer-object-spread': 'error',
    'getter-return': 'error',
    // 'implicit-arrow-linebreak': ['error', 'beside'],
    'lines-between-class-members': ['error', 'always'],
    'for-direction': 'error',
    'constructor-super': 2,
    'generator-star-spacing': 'off',
    'no-this-before-super': 2,
    'no-var': 2,
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-spread': 2,
    'prefer-reflect': 2,
    'prefer-template': 2,
    'require-yield': 2,

    // promises
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/no-nesting': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/always-return': 0,

    // security hardening
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-new-buffer': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error'
  }
};
