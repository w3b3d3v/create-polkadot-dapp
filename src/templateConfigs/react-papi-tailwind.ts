import { TemplateConfig } from "#src/templateConfigs/index";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  npmRoots: ["/"],
  instructions: `
${c.secondary("Start app:")}
${c.code("npm run dev")}`,
  postinstallScript: "npx papi update",
};

export default config;
