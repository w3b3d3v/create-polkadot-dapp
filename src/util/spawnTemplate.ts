import { spawnAndWait } from "#src/util/childProcess";
import { DappData } from "#src/util/dappData";
import fs from "fs/promises";
import path from "path";
import { PackageJson } from "type-fest";

export async function spawnTemplate(dappData: DappData): Promise<void> {
  const targetDir = path.join(process.cwd(), dappData.name);
  const templatesDir = path.resolve(__dirname, "../..", "templates");

  await copyTemplate(dappData, targetDir, templatesDir);
  await updateFiles(dappData, targetDir);
  await installDeps(targetDir);
  await setupPapi(targetDir);

  console.log(`\nSuccess! Type "cd ${dappData.name} && npm run dev" to start hacking`);
}

async function copyTemplate(dappData: DappData, targetDir: string, templatesDir: string): Promise<void> {
  console.log(`Copying the template ${dappData.template}`);

  try {
    await fs.cp(path.join(templatesDir, dappData.template), targetDir, {
      recursive: true,
      errorOnExist: true,
      force: false,
    });
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ERR_FS_CP_EEXIST") {
      console.log(`Error: directory ${dappData.name} already exists`);
      process.exit(1);
    }
  }
}

async function updateFiles(dappData: DappData, targetDir: string): Promise<void> {
  console.log("Updating template files");

  const pkgJsonPath = path.join(targetDir, "package.json");
  const pkgJsonContent = JSON.parse(await fs.readFile(pkgJsonPath, "utf8")) as PackageJson;

  pkgJsonContent.name = dappData.name;

  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJsonContent, null, 2));
}

async function installDeps(targetDir: string): Promise<void> {
  console.log("Installing dependencies");

  await spawnAndWait("npm", ["install"], { cwd: targetDir });
}

async function setupPapi(targetDir: string): Promise<void> {
  console.log("Setting up polkadot-api");

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
