import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  setupPapi: false,
  npmRoots: ["contracts", "frontend"],
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
    /^package-lock\.json/,
  ],
  instructions: `
${c.primary("For Remix environment:")}
${c.primary("1. ")}${c.secondary("start remixd environment: ")}${c.code("pnpm remixd")}
${c.primary("2. ")}${c.secondary("edit, deploying and pin smart contracts in Remix")}
${c.primary("3. ")}${c.secondary("export the contracts: ")}${c.code("pnpm contracts:export")}

${c.primary("For local environment:")}
${c.primary("1. ")}${c.secondary("edit and build smart contracts: ")}${c.code("pnpm contracts:build")}
${c.primary("2. ")}${c.secondary("deploy smart contracts to chain: ")}${c.code("pnpm contracts:deploy")}
${c.primary("3. ")}${c.secondary("export the contracts: ")}${c.code("pnpm contracts:export")}

${c.primary("Use the contract in the frontend app:")}
${c.primary("1. ")}${c.secondary("use exported smart contract address in ")}${c.code("frontend/src/App.tsx")}
${c.primary("2. ")}${c.secondary("start frontend app: ")}${c.code("pnpm frontend:dev")}
`,
};

export default config;
