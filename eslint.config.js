import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import-x";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const customStylistic = stylistic.configs.customize({
  semi: true,
  quotes: "double",
});

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  {
    ...customStylistic,
    rules: {
      ...customStylistic.rules,
      "@stylistic/operator-linebreak": "off",
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/brace-style": "off",
      "@stylistic/arrow-parens": "off",
      "@stylistic/jsx-closing-tag-location": "off",
      "@stylistic/jsx-curly-newline": "off",
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    ...importPlugin.flatConfigs.recommended,
    rules: {
      "import-x/extensions": ["error", "always", { ignorePackages: true }],
    },
  },
);
