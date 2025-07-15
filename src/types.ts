export enum TemplateType {
  Recommended,
  Deprecated,
  // TODO: External
}

export type TemplateConfig = {
  instructions: string;
  npmRoots: string[];
  postinstallScript?: string;
  templateType: TemplateType;
  description: string;
};
