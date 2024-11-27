import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  setupPapi: true,
  backSyncPatterns: [/^src.*/],
  instructions: `
${c.secondary("Start app:")}
${c.code("pnpm dev")}`,
};

export default config;
