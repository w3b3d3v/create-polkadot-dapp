import chalk from "chalk";

export const colors = {
  primary: chalk.bold,
  secondary: chalk.reset,
  accent: chalk.cyan,
  code: chalk.gray.bold,
};

export function success(val: string): string {
  return `${chalk.green("✔")} ${colors.primary(val)}`;
}
