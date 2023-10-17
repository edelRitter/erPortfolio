const path = require("path");
const OFF = 0;
const WARN = 1;
const ERROR = 2;
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:vue/essential", "airbnb-base", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  plugins: ["vue"],
  ignorePatterns: [
    "**/node_modules/**",
    "node_modules"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? WARN : OFF,
    "no-debugger": process.env.NODE_ENV === "production" ? ERROR : OFF,
    "no-useless-return": OFF,
    "no-multiple-empty-lines": OFF,
    "no-new": OFF,
    "no-unused-expressions": OFF,
    "array-callback-return": OFF
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.join(__dirname, "src")]],
        extensions: [".ts", ".js", ".jsx", ".json", ".vue"]
      }
    }
  }
};