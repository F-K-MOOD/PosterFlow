import jslint from "@eslint/js";
import tslint from "typescript-eslint";
import eslintVue from "eslint-plugin-vue";
import eslintImportSort from "eslint-plugin-simple-import-sort";

export default [
  jslint.configs.recommended,
  ...tslint.configs.recommended,
  ...eslintVue.configs["flat/recommended"],
  {
    files: ["**/*.vue", "*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
    plugins: {
      "simple-import-sort": eslintImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn", // import 语句强制按字母顺序排序
      "simple-import-sort/exports": "warn", // export 语句强制按字母顺序排序
      "vue/html-indent": "off", // 关闭 Vue 自带的 HTML 缩进规则（交给 Prettier 处理）
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: {
            max: 3,
          },
          multiline: {
            max: 1,
          },
        },
      ],
      "vue/multi-word-component-names": "off", // 关闭组件名称必须为多单词的检查
      "vue/singleline-html-element-content-newline": "off", // 关闭单行 HTML 元素内容换行检查
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.{ts,tsx}", "*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        parser: tslint.parser,
      },
    },
    plugins: {
      "simple-import-sort": eslintImportSort,
    },
    rules: {
      "simple-import-sort/imports": "warn", // import 语句强制按字母顺序排序
      "simple-import-sort/exports": "warn", // export 语句强制按字母顺序排序
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];