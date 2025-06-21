module.exports = {
  extends: ["../config/eslint.js"],
  env: {
    browser: true,
    es2022: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
