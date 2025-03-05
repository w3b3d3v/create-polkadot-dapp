import defaultConfiguration from "@eng-automation/js-style/src/prettier/configuration.js";

export default {
  ...defaultConfiguration,
  plugins: ["prettier-plugin-tailwindcss"],
};
