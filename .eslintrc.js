module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb/hooks",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    projects: ["./packages/*"],
    ecmaVersion: 2020,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: [1, "double"],
    "linebreak-style": [0, "windows"],
    "jsx-a11y/alt-text": [0],
    "import/extensions": [0],
  },
};
