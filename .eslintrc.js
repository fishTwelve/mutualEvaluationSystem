module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        '@ecomfe/eslint-config',
        '@ecomfe/eslint-config/vue'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'vue/require-default-prop': 1,
        'no-use-before-define': 0,
        'comma-dangle': 0
    }
};
