import jslint  from '@eslint/js'
import tslint from 'typescript-eslint'
import eslintVue from 'eslint-plugin-vue'
import eslintImportSort from 'eslint-plugin-simple-import-sort'

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
    },
  },
];
