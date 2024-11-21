import { TemplateConfig } from "#src/templateConfigs/index";

const config: TemplateConfig = {
  setupPapi: true,
  backSyncPatterns: [/^src.*/],
};

export default config;
