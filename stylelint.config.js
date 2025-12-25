import stylelintConfigRecommended from "stylelint-config-recommended";
import stylelintConfigRecommendedVue from "stylelint-config-recommended-vue";

export default {
  extends: [stylelintConfigRecommended, stylelintConfigRecommendedVue],
  overrides: [
    {
      files: ["*.vue", "**/*.vue"],
      rules: {
        "unit-allowed-list": ["em", "rem", "s", "ms"],
      },
    },
  ],
  rules: {
    "no-duplicate-selectors": null,
  },
};
