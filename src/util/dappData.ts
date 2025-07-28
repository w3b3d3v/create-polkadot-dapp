import { input, select, Separator } from "@inquirer/prompts";
import { configs, TemplateNames, availableTemplates } from "#src/templateConfigs/index";
import { TemplateConfig, TemplateType } from "#src/types";
import { colors as c } from "#src/util/log";

export type DappData = {
  name: string;
  template: TemplateNames;
  config: TemplateConfig;
};

export type CliArgs = {
  projectName?: string;
  template?: string;
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

function validateTemplate(template: string): TemplateNames | null {
  if (availableTemplates.includes(template)) {
    return template as TemplateNames;
  }
  return null;
}

async function promptForTemplate(): Promise<TemplateNames> {
  return await select<TemplateNames>({
    message: "Select template",
    choices: formatChoices(),
  });
}

export async function inquireDappData(cliArgs: CliArgs = {}): Promise<DappData> {
  // Use CLI arg if provided, otherwise prompt
  let name: string;
  if (cliArgs.projectName) {
    name = cliArgs.projectName;
  } else {
    name = await input({ message: "Project name", required: true, default: "my-polkadot-dapp" });
  }

  // Use CLI arg if provided and valid, otherwise prompt
  let template: TemplateNames;
  if (cliArgs.template) {
    const validatedTemplate = validateTemplate(cliArgs.template);
    if (validatedTemplate) {
      template = validatedTemplate;
      console.log(`Using template: ${c.primary(template)}`);
    } else {
      console.log(
        c.primary(`Invalid template "${cliArgs.template}". Available templates: ${availableTemplates.join(", ")}`),
      );
      template = await promptForTemplate();
    }
  } else {
    template = await promptForTemplate();
  }

  return { name, config: configs[template], template };
}
