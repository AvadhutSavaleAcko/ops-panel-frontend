export default {
  "**/*.ts?(x)": () => "tsc --noEmit",
  "*.{js,jsx,ts,tsx,html,json,md}": "npm run format",
  "*.{js,jsx,ts,tsx,}": "npm run lint",
  "**/*.{tsx,css}": "npm run lint:css",
};
