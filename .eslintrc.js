module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "react-app/jest"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "rules": {
    "prefer-const": "warn",
    "semi": ["warn", "always"],
    "quotes": ["warn", "double"],
    "no-console": "warn",
    "indent": ["warn", 2],
    "import/order": ["error", {"groups": ["index", "sibling", "parent", "internal", "external", "builtin", "object", "type"]}]
  }
};
