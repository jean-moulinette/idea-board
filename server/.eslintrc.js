const path = require('path')

module.exports = {
    "env": {
        "es6": true,
        "node": true
    },

    "extends": ["airbnb-base"],

    "rules": {

        "object-shorthand": 0,
        "func-names": 0,
        "space-before-function-paren": 0,
        "import/no-extraneous-dependencies": 0,
        "no-console": 0,
        "no-underscore-dangle": 0,
        "import/no-unresolved": [2, { commonjs: true }],
        "no-use-before-define": [2, {"functions": false}],

        "comma-dangle": ["error", {
          "arrays": "always-multiline",
          "objects": "always-multiline",
          "imports": "always",
          "exports": "always",
          "functions": "ignore"
        }],

        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    },
    "settings": {
        "import/resolver": {
            "node": {
                "moduleDirectory": [
                    '.',
                    'node_modules',
                ] 
            }
        }
    }
};