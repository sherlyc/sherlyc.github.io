import { ContentBlockType } from "./ContentBlockType";

export interface IModuleTitle {
  type: ContentBlockType.ModuleTitle;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
}
