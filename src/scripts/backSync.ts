import { availableTemplates, configs, TemplateNames } from "#src/templateConfigs/index";
import chokidar from "chokidar";
import { Option, program } from "commander";
import fs from "fs";
import * as process from "node:process";
import path from "path";

program
  .addOption(new Option("-s, --source <path>", "Repository path where to sync files from").makeOptionMandatory(true))
  .addOption(
    new Option("-t, --template <template>", "Repository path where to sync files from")
      .choices(availableTemplates)
      .makeOptionMandatory(true),
  )
  .addOption(new Option("--rm", "Delete files in template, when they are deleted in synced repo").default(false));

program.parse();
const options: { source: string; template: TemplateNames; rm: boolean } = program.opts();

const config = configs[options.template];

const watcher = chokidar.watch(options.source, {
  persistent: true,
  cwd: options.source,
  ignoreInitial: true,
  ignored: (updPath) => {
    if (updPath === options.source) return false;
    const relpath = path.relative(options.source, updPath);
    const matched = config.backSyncPatterns.some((pattern) => pattern.test(relpath));

    return !matched;
  },
});

const targetPath = path.join(process.cwd(), "templates", options.template);

watcher.on("change", (updPath: string) => {
  fs.cp(path.join(options.source, updPath), path.join(targetPath, updPath), (err) => {
    if (err) {
      console.error(`Failed to update ${updPath}`, err);
    } else {
      console.log(`${updPath} updated`);
    }
  });
});
watcher.on("add", (updPath: string) => {
  fs.cp(path.join(options.source, updPath), path.join(targetPath, updPath), (err) => {
    if (err) {
      console.error(`Failed to create file ${updPath}`, err);
    } else {
      console.log(`Created ${updPath}`);
    }
  });
});
watcher.on("addDir", (updPath: string) => {
  fs.mkdir(path.join(targetPath, updPath), (err) => {
    if (err) {
      console.error(`Failed to create dir ${updPath}`, err);
    } else {
      console.log(`Created dir ${updPath}`);
    }
  });
});
if (options.rm) {
  const unlinkHandler = (updPath: string) => {
    fs.rm(path.join(targetPath, updPath), { recursive: true }, (err) => {
      if (err) {
        console.error(`Failed remove ${updPath}`, err);
      } else {
        console.log(`Removed ${updPath}`);
      }
    });
  };
  watcher.on("unlink", unlinkHandler);
  watcher.on("unlinkDir", unlinkHandler);
}
