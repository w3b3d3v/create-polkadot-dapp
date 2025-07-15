import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  npmRoots: ["contracts", "frontend"],
  instructions: `
${c.primary("For Remix environment:")}
${c.primary("1. ")}${c.secondary("install remixd globally: ")}${c.code("npm install -g @remix-project/remixd")}
${c.primary("2. ")}${c.secondary("go to contracts dir: ")}${c.code("cd contracts")}
${c.primary("3. ")}${c.secondary("start remixd environment: ")}${c.code("npm run remixd")}
${c.primary("4. ")}${c.secondary("edit, deploying and pin smart contracts in Remix")}

${c.primary("For local environment:")}
${c.primary("1. ")}${c.secondary("go to contracts dir: ")}${c.code("cd contracts")}
${c.primary("2. ")}${c.secondary("edit and build smart contracts: ")}${c.code("npm run build")}
${c.primary("3. ")}${c.secondary("deploy smart contracts to chain: ")}${c.code("npm run deploy-contracts")}

${c.primary("Use the contract in the frontend app:")}
${c.primary("1. ")}${c.secondary("go to frontend dir: ")}${c.code("cd frontend")}
${c.primary("2. ")}${c.secondary("import contracts: ")}${c.code("npm run import-contracts")}
${c.primary("3. ")}${c.secondary("use smart contract address in ")}${c.code("src/App.tsx")}
${c.primary("4. ")}${c.secondary("start frontend app: ")}${c.code("npm run dev")}
`,
};

export default config;
