/* eslint-env node */
module.exports = {
  plugins: ['eslint-plugin-prettier'],
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prefer-const': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-prettier'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      rules: {
        'prefer-const': 'off',
        'no-dupe-class-members': 'off',
        '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],

        '@typescript-eslint/explicit-member-accessibility': 'error',

        // Disallow the use of bare `Function`, `Object` and boxed types
        '@typescript-eslint/ban-types': [
          'error',
          {
            types: {
              Function: {
                fixWith: '() => unknown',
                message: 'Avoid `Function` in favor of a more precise callable type.',
              },

              Object: {
                fixWith: '{}',
                message:
                  'Use `{}` for objects with no specialized fields, or `object` if you really mean "any non-primitive value".',
              },

              String: {
                fixWith: 'string',
                message:
                  'Avoid boxed types. See https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#general-types',
              },

              Number: {
                message:
                  'Avoid boxed types. See https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#general-types',
                fixWith: 'number',
              },

              Symbol: {
                message:
                  'Avoid boxed types. See https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#general-types',
                fixWith: 'symbol',
              },

              Boolean: {
                message:
                  'Avoid boxed types. See https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#general-types',
                fixWith: 'boolean',
              },
            },
          },
        ],
      },
    },
    {
      // Typical project config files
      files: ['.*.js', '*.config.js'],
      env: {
        node: true,
        browser: false,
      },
    },
  ],
};
