import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  npmRoots: ["contracts", "frontend"],
  instructions: `
${c.primary("Develop smart contracts:")}
${c.primary("1. ")}${c.secondary("set up hardhat environment (see README.md): ")}
${c.primary("2. ")}${c.secondary("edit contracts in ")}${c.code("contracts/contracts")}
${c.primary("3. ")}${c.secondary("edit ignition module in ")}${c.code("contracts/igniton/modules")}
${c.primary("4. ")}${c.secondary("deploy the contract with ")}${c.code("npx hardhat ignition deploy")}

${c.primary("Use the contract in the frontend app:")}
${c.primary("1. ")}${c.secondary("go to ")}${c.code("frontend")}${c.secondary(" directory ")}
${c.primary("2. ")}${c.secondary("generate the types with ")}${c.code("npm run generate")}
${c.primary("3. ")}${c.secondary("start frontend app: ")}${c.code("npm run dev")}

${c.secondary("See ")}${c.primary("README.md")}${c.secondary(" for more info")}
`,
};

export default config;
