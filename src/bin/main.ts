#!/usr/bin/env node
import { ExitPromptError } from "@inquirer/core";
import { Command } from "commander";
import { inquireDappData } from "#src/util/dappData";
import { spawnTemplate } from "#src/util/spawnTemplate";
import { availableTemplates } from "#src/templateConfigs/index";

/* This is somewhat a hack to automatically include
  package.json and "src" folder into "dist"
  it's needed both for #src/* paths support and for having the templates/
  folder on top-level */
import * as pkg from "../../package.json";

(async () => {
  console.log(`${pkg.name} ${pkg.version}`);

  const program = new Command();

  program
    .name(pkg.name)
    .description("CLI to create Polkadot dApps")
    .version(pkg.version)
    .option("--project-name <name>", "Name of the project")
    .option("--template <template>", `Template to use (${availableTemplates.join(", ")})`)
    .parse();

  const options = program.opts();

  const dappData = await inquireDappData({
    projectName: options.projectName,
    template: options.template,
  });

  await spawnTemplate(dappData);
})().catch((err: unknown) => {
  if (err instanceof ExitPromptError) {
    console.log("Cancelled");
  } else {
    console.error(err);
  }
  process.exit(1);
});
