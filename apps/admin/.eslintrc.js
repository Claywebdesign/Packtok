module.exports = {
  extends: [
    "../../packages/config/eslint.js",
    "next/core-web-vitals", // Next.js specific rules
  ],
  env: {
    browser: true,
    es2022: true,
  },
  // Admin-specific overrides
  rules: {
    // Add any admin-specific linting rules here
    "@next/next/no-html-link-for-pages": "off",
  },
};
