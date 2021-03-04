module.exports = {
    env: {
        'browser': true,
        'es6': true
    },
    extends: [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/vue',
        '@ecomfe/eslint-config/typescript'
    ],
    globals: {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    parserOptions: {
        'ecmaVersion': 2018,
        'sourceType': 'module',
        requireConfigFile: false,
        tsconfigRootDir: __dirname,
        project: [
            'tsconfig.json'
        ],
    },
    rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-require-imports': 'warn',
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/no-use-before-define': ['error', {'functions': false}],
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/member-ordering': 'off',
        'comma-dangle': 'off',
        'vue/require-direct-export': 'off'
    }
};
