import { availableTemplates, TemplateNames } from "#src/templateConfigs/index";
import { colors as c, success } from "#src/util/log";
import chokidar from "chokidar";
import { Option, program } from "commander";
import fs from "fs";
import ignore from "ignore";
import * as process from "node:process";
import path from "path";
import { debuglog } from "util";

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

const alwaysIgnorePatterns = [/^\.papi\/metadata.*/, /^\.gitignore$/];

const gitignoreContents = fs.readFileSync(path.join(options.source, ".gitignore"), "utf-8");
const gitignoreIg = ignore().add(gitignoreContents);

if (!fs.existsSync(options.source)) {
  console.error(`Directory ${options.source} doesn't exist`);
  process.exit(1);
}

const watcher = chokidar.watch(options.source, {
  persistent: true,
  cwd: options.source,
  ignoreInitial: true,
  ignored: (updPath) => {
    if (updPath === options.source) return false;
    const relpath = path.relative(options.source, updPath);

    if (alwaysIgnorePatterns.some((pattern) => pattern.test(relpath))) return true;
    if (gitignoreIg.ignores(relpath)) return true;

    return false;
  },
});

const targetPath = path.join(process.cwd(), "templates", options.template);
const formatPath = (val: string) => c.accent("/" + val);

if (debuglog("back-sync").enabled) {
  watcher.on("raw", (event, val, details) => {
    console.log(event, val, details);
  });
}

watcher.on("change", (val: string) => {
  fs.cp(path.join(options.source, val), path.join(targetPath, val), (err) => {
    if (err) {
      console.error(`Failed to update ${val}`, err);
    } else {
      console.log(success(`${formatPath(val)} updated`));
    }
  });
});

watcher.on("add", (val: string) => {
  fs.cp(path.join(options.source, val), path.join(targetPath, val), (err) => {
    if (err) {
      console.error(`Failed to create file ${val}`, err);
    } else {
      console.log(success(`Created ${formatPath(val)}`));
    }
  });
});

watcher.on("addDir", (val: string) => {
  fs.mkdir(path.join(targetPath, val), (err) => {
    if (err) {
      console.error(`Failed to create dir ${val}`, err);
    } else {
      console.log(success(`Created dir ${formatPath(val)}`));
    }
  });
});

if (options.rm) {
  const unlinkHandler = (val: string) => {
    fs.rm(path.join(targetPath, val), { recursive: true }, (err) => {
      if (err) {
        console.error(`Failed remove ${val}`, err);
      } else {
        console.log(success(`Removed ${formatPath(val)}`));
      }
    });
  };
  watcher.on("unlink", unlinkHandler);
  watcher.on("unlinkDir", unlinkHandler);
}

watcher.on("error", (error) => console.error(`Watcher error: ${error}`));
