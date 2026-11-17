import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ["baseline/**", "baseline-smoke/**", "reconstruction/**", "scripts/capture-site.mjs", "scripts/serve-static.mjs", "scripts/serve-mock.mjs", "scripts/verify-mirror.mjs", "scripts/validate-docs.mjs", "**/.next/**", "**/dist/**", "apps/web/next-env.d.ts", "coverage/**", "node_modules/**"],
  },
  {
    files: ["tests/**/*.ts"],
    languageOptions: {
      globals: { describe: "readonly", expect: "readonly", it: "readonly" }
    }
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }]
    }
  }
);
