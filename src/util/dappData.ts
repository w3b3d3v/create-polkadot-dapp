import { input, select } from "@inquirer/prompts";
import { configs, TemplateConfig, TemplateNames } from "#src/templateConfigs/index";

export type DappData = {
  name: string;
  template: TemplateNames;
  config: TemplateConfig;
};

export async function inquireDappData(): Promise<DappData> {
  const name = await input({ message: "Project name", required: true, default: "my-polkadot-dapp" });
  const template: TemplateNames = await select<TemplateNames>({
    message: "Select template",
    choices: Object.keys(configs),
  });

  return { name, config: configs[template], template };
}
