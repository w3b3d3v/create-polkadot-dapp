import reactTailwind from "./react-tailwind";

export type TemplateConfig = {
  setupPapi: boolean;
  backSyncPatterns: RegExp[];
};

export const configs: Record<string, TemplateConfig> = {
  "react-tailwind": reactTailwind,
};

export type TemplateNames = keyof typeof configs;
export const availableTemplates = Object.keys(configs);
