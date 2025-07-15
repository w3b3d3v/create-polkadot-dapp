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
  await installDeps(targetDir, dappData);
  if (dappData.config.postinstallScript) {
    await spawnAndWait("bash", ["-c", dappData.config.postinstallScript], { cwd: targetDir, shell: false });
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

  for (const root of dappData.config.npmRoots) {
    const pkgJsonPath = path.join(targetDir, root, "package.json");
    const pkgJsonContent = JSON.parse(await fs.readFile(pkgJsonPath, "utf8")) as PackageJson;

    pkgJsonContent.name = dappData.name;

    await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJsonContent, null, 2));
  }

  await fs.rename(path.join(targetDir, "gitignore"), path.join(targetDir, ".gitignore"));
}

async function installDeps(targetDir: string, dappData: DappData): Promise<void> {
  console.log(c.primary("Installing dependencies..."));

  for (const root of dappData.config.npmRoots) {
    await spawnAndWait("npm", ["install"], { cwd: path.join(targetDir, root) });
  }
}
