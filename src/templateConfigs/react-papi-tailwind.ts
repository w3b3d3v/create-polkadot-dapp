import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  setupPapi: true,
  backSyncPatterns: [/^src.*/],
  npmRoots: ["/"],
  instructions: `
${c.secondary("Start app:")}
${c.code("npm run dev")}`,
};

export default config;
