import { spawnAndWait } from "#src/util/childProcess";
import { DappData } from "#src/util/dappData";
import { colors as c, success } from "#src/util/log";
import fs from "fs/promises";
import path from "path";
import { PackageJson } from "type-fest";

export async function spawnTemplate(dappData: DappData): Promise<void> {
  const targetDir = path.join(process.cwd(), dappData.name);
  console.log(`${c.secondary("\nCreating repository in")} ${c.accent(targetDir)}\n`);
  const templatesDir = path.resolve(__dirname, "../..", "templates");

  await copyTemplate(dappData, targetDir, templatesDir);
  await updateFiles(dappData, targetDir);
  await installDeps(targetDir);
  if (dappData.config.setupPapi) {
    await setupPapi(targetDir);
  }

  console.log(
    success("Successfully created repository!\n\n") +
      c.secondary("Go to repository:\n") +
      c.code(`cd ${dappData.name}`) +
      "\n" +
      dappData.config.instructions,
  );
}

async function copyTemplate(dappData: DappData, targetDir: string, templatesDir: string): Promise<void> {
  console.log(`${c.primary("Copying the template")} ${c.accent(dappData.template)}${c.primary("...")}`);

  try {
    await fs.cp(path.join(templatesDir, dappData.template), targetDir, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ERR_FS_CP_EEXIST") {
      console.error(`Error: directory ${dappData.name} already exists`);
      process.exit(1);
    }
  }
}

async function updateFiles(dappData: DappData, targetDir: string): Promise<void> {
  console.log(c.primary("Updating template files..."));

  const pkgJsonPath = path.join(targetDir, "package.json");
  const pkgJsonContent = JSON.parse(await fs.readFile(pkgJsonPath, "utf8")) as PackageJson;

  pkgJsonContent.name = dappData.name;

  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJsonContent, null, 2));
}

async function installDeps(targetDir: string): Promise<void> {
  console.log(c.primary("Installing dependencies..."));

  await spawnAndWait("pnpm", ["install"], { cwd: targetDir });
}

async function setupPapi(targetDir: string): Promise<void> {
  console.log(c.primary("Setting up polkadot-api..."));

  await spawnAndWait("npx", ["papi", "add", "--skip-codegen", "-n", "paseo", "paseo"], { cwd: targetDir });
  await spawnAndWait("npx", ["papi", "add", "--skip-codegen", "-n", "paseo_asset_hub", "paseo_asset_hub"], {
    cwd: targetDir,
  });
  await spawnAndWait("npx", ["papi", "add", "--skip-codegen", "-n", "polkadot", "polkadot"], {
    cwd: targetDir,
  });
  await spawnAndWait("npx", ["papi", "add", "--skip-codegen", "-n", "polkadot_asset_hub", "polkadot_asset_hub"], {
    cwd: targetDir,
  });

  await spawnAndWait("npx", ["papi"], { cwd: targetDir });
}
