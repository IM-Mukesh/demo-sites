import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    ignores: ["public/**", "scripts/**"],
  },
];

export default eslintConfig;
