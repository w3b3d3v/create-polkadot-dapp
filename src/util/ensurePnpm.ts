import { confirm } from "@inquirer/prompts";
import { spawnAndWait } from "#src/util/childProcess";
import { colors as c, success } from "#src/util/log";
import cp from "child_process";

export async function ensurePnpm(): Promise<void> {
  console.log(`${c.secondary(`Checking ${c.accent("pnpm")}`)}\n`);

  try {
    cp.execSync("pnpm --version", { stdio: "ignore" });

    console.log(success(`${c.accent("pnpm")} is installed\n`));
    return;
  } catch (e) {
    // Checking that it's an npx's "command not found" error
    if (!(e instanceof Error) || !("status" in e) || e.status !== 127) {
      throw e;
    }
  }

  const res = await confirm({ message: `The template uses ${c.accent("pnpm")} as a package manager. Install it?` });

  if (!res) {
    console.error("Abort");
    process.exit(1);
  }

  await spawnAndWait("npm", ["install", "-g", "pnpm"], {});

  console.log(success(`${c.accent("pnpm")} has been installed\n`));
}
