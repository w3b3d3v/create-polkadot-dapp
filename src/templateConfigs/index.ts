import reactPapiTailwind from "./react-papi-tailwind";
import reactSolidity from "./react-solidity";

export type TemplateConfig = {
  setupPapi: boolean;
  backSyncPatterns: RegExp[];
  instructions: string;
};

export const configs: Record<string, TemplateConfig> = {
  "react-papi-tailwind": reactPapiTailwind,
  "react-solidity": reactSolidity,
};

export type TemplateNames = keyof typeof configs;
export const availableTemplates = Object.keys(configs);
