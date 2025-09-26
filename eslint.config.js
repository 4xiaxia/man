import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        // Browser globals
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        alert: "readonly",
        fetch: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        localStorage: "readonly",
        sessionStorage: "readonly",
        URLSearchParams: "readonly",
        URL: "readonly",
        HTMLElement: "readonly",
        HTMLDivElement: "readonly",
        HTMLButtonElement: "readonly",
        HTMLInputElement: "readonly",
        HTMLTableElement: "readonly",
        HTMLTableSectionElement: "readonly",
        HTMLTableRowElement: "readonly",
        HTMLTableCellElement: "readonly",
        HTMLTableCaptionElement: "readonly",
        HTMLSpanElement: "readonly",
        HTMLImageElement: "readonly",
        HTMLFormElement: "readonly",
        MediaQueryListEvent: "readonly",
        PopStateEvent: "readonly",
        FileReader: "readonly",
        ProgressEvent: "readonly",
        TextEncoder: "readonly",
        crypto: "readonly",
        // Node.js globals
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        React: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: react,
      "react-hooks": reactHooks,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",

      // React rules
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "off", // Use TypeScript version instead
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "**/*.min.js",
      "client/test-build/**",
      "client/test-output/**",
    ],
  },
];
