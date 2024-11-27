import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  setupPapi: false,
  backSyncPatterns: [
    /^contracts$/,
    /^contracts\/.+.sol/,
    /^contracts\/package\.json/,
    /^contracts\/tsconfig\.json/,
    /^contracts\/src.*/,
    /^frontend$/,
    /^frontend\/src.*/,
    /^frontend\/package\.json/,
    /^package\.json/,
  ],
  instructions: `
${c.secondary("Start remixd environment:")}
${c.code("pnpm remixd")}

${c.secondary("Start frontend app:")}
${c.code("pnpm frontend:dev")}`,
};

export default config;
