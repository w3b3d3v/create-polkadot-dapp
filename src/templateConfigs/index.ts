import reactPapiTailwind from "./react-papi-tailwind";
import reactSolidity from "./react-solidity";
import reactSolidityHardhat from "./react-solidity-hardhat";

export type TemplateConfig = {
  setupPapi: boolean;
  backSyncPatterns: RegExp[];
  instructions: string;
  npmRoots: string[];
};

export const configs: Record<string, TemplateConfig> = {
  "react-papi-tailwind": reactPapiTailwind,
  "react-solidity": reactSolidity,
  "react-solidity-hardhat": reactSolidityHardhat,
};

export type TemplateNames = keyof typeof configs;
export const availableTemplates = Object.keys(configs);
