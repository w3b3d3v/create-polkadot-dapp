import { ExitPromptError } from "@inquirer/core";
import { inquireDappData } from "#src/util/dappData";
import { spawnTemplate } from "#src/util/spawnTemplate";

/* This is somewhat a hack to automatically include
  package.json and "src" folder into "dist"
  it's needed both for #src/* paths support and for having the templates/
  folder on top-level */
import * as pkg from "../../package.json";

(async () => {
  console.log(`${pkg.name} ${pkg.version}`);
  const dappData = await inquireDappData();

  await spawnTemplate(dappData);
})().catch((err: unknown) => {
  if (err instanceof ExitPromptError) {
    console.log("Cancelled");
  } else {
    console.error(err);
  }
  process.exit(1);
});
