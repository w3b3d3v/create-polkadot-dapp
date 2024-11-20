import { input, select } from "@inquirer/prompts";
import { DappData, Template } from "#src/types";

export async function inquireDappData(): Promise<DappData> {
  const name = await input({ message: "Project name", required: true, default: "my-polkadot-dapp" });
  const template = await select<Template>({
    message: "Select template",
    choices: ["react-tailwind"],
  });

  return { name, template };
}
