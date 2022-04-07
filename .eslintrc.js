module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "airbnb/hooks",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    projects: ["./packages/*"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    quotes: [1, "double"],
    "linebreak-style": ["error", "windows"],
    "jsx-a11y/alt-text": [
      0,
      {
        img: ["off"],
      },
    ],
  },
};
