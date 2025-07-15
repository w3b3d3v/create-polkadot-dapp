import { input, select, Separator } from "@inquirer/prompts";
import { configs, TemplateNames } from "#src/templateConfigs/index";
import { TemplateConfig, TemplateType } from "#src/types";
import { colors as c } from "#src/util/log";

export type DappData = {
  name: string;
  template: TemplateNames;
  config: TemplateConfig;
};

type Choice = {
  value: TemplateNames;
  description: string;
};

function formatChoices(): (Choice | Separator)[] {
  const res: (Choice | Separator)[] = [];

  const mapTemplate = ([name, template]: [TemplateNames, TemplateConfig]) => {
    return { value: name as TemplateNames, description: template.description };
  };

  res.push(new Separator(c.primary("Recommended templates:")));
  const recommendedTemplates = Object.entries(configs).filter(
    ([_, template]) => template.templateType === TemplateType.Recommended,
  );
  res.push(...recommendedTemplates.map(mapTemplate), new Separator());

  res.push(new Separator(c.primary("Deprecated templates:")));
  const deprecatedTemplates = Object.entries(configs).filter(
    ([_, template]) => template.templateType === TemplateType.Deprecated,
  );
  res.push(...deprecatedTemplates.map(mapTemplate));

  return res;
}

export async function inquireDappData(): Promise<DappData> {
  const name = await input({ message: "Project name", required: true, default: "my-polkadot-dapp" });
  const template: TemplateNames = await select<TemplateNames>({
    message: "Select template",
    choices: formatChoices(),
  });

  return { name, config: configs[template], template };
}
