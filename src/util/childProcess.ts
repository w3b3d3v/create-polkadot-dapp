import cp from "child_process";

export function spawnAndWait(cmd: string, args: string[], { cwd }: { cwd?: string }): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = cp.spawn(cmd, args, { stdio: "inherit", shell: true, cwd: cwd ?? process.cwd() });
    proc.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else
        reject(
          `Process ${cmd} ${args.join(" ")} ` + signal === null
            ? `exited with code ${code}`
            : `killed with signal ${signal}`,
        );
    });
  });
}
