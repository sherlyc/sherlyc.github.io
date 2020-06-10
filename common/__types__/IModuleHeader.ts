import { ContentBlockType } from "./ContentBlockType";
import { AccentColor } from "./AccentColor";

export enum ModuleHeaderVariation {
  NoLine = "NoLine",
  FancyFont = "FancyFont"
}

export interface IModuleHeader {
  type: ContentBlockType.ModuleHeader;
  title?: string;
  url?: string;
  variation?: ModuleHeaderVariation;
  color: AccentColor;
}
