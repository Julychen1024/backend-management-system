import { defineConfig, globalIgnores } from "eslint/config"; // 官方API
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default defineConfig([
  // ========== 全局忽略配置 ==========
  // 使用官方 globalIgnores 函数（返回配置对象）
  globalIgnores([
    "dist/**",      // 构建输出
    "node_modules/**", // 依赖目录
    "**/*.config.{js,ts}", // 配置文件
    "coverage/**",  // 测试覆盖率
    "public/**",    // 静态资源
  ]),

  // ========== 核心 TypeScript/React 配置 ==========
  {
    name: "typescript-react-rules",
    files: ["**/*.{ts,tsx,js,jsx}"],

    // extends 在 Flat Config 中是数组合并
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked, // 推荐类型检查版本
      ...tseslint.configs.stylisticTypeChecked,   // 可选：风格建议
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2022,
        React: "readonly",
        JSX: "readonly", // 补充JSX全局类型
      },
      parserOptions: {
        // ESLint 9+ 推荐：自动服务化，替代传统 project 字段
        projectService: {
          defaultProject: "./tsconfig.json", // 指定默认项目
          allowDefaultProject: ["*.config.*"], // 允许无TSConfig的文件
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    // 插件注册
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      // ===== 命名规范 =====
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"], // React组件允许PascalCase
        },
        {
          selector: "typeLike",
          format: ["PascalCase"],
        },
      ],

      // ===== TypeScript 核心规则 =====
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn", // 新增：禁止不安全的any赋值
      "prefer-const": "error",

      // ===== React Hooks 规则 =====
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ===== React Refresh 规则（修正版）=======
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: ["meta", "config"], // Vite特殊导出
        },
      ],

      // ===== 通用 JavaScript 规则 =====
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "warn",
      "prefer-arrow-callback": "error",
      eqeqeq: ["error", "always"],
    },
  },

  // ========== 配置文件特殊处理 ==========
  {
    name: "config-files",
    files: ["vite.config.{ts,js}", "eslint.config.js"],
    languageOptions: {
      globals: {
        ...globals.node, //  Node.js全局变量
      },
    },
    rules: {
      "no-console": "off",
      "@typescript-eslint/no-require-imports": "off", // ESLint 9+ 新规则名
    },
  },
]);