import { TemplateConfig, TemplateType } from "#src/types";
import { colors as c } from "#src/util/log";

const config: TemplateConfig = {
  templateType: TemplateType.Recommended,
  description: "Frontend dApp template using React, PAPI, ReactiveDOT and dot-connect",
  npmRoots: ["/"],
  instructions: `
${c.secondary("Start app:")}
${c.code("npm run dev")}`,
  postinstallScript: "npx papi update",
};

export default config;
