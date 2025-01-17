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
    /^pnpm-lock\.yaml/,
  ],
  instructions: `
${c.primary("Step 1: ")}${c.secondary("start remixd environment")}
${c.code("pnpm remixd")}

${c.primary("Step 2: ")}\
${c.secondary("after deploying and pinning smart contracts in remix, build the contracts")}
${c.code("pnpm contracts:build")}

${c.primary("Step 3: ")}${c.secondary("start frontend app")}
${c.code("pnpm frontend:dev")}`,
};

export default config;
