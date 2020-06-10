import { ContentBlockType } from "./ContentBlockType";
import { AccentColor } from "./AccentColor";

export enum ModuleHeaderVariation {
  Smaller = "Smaller",
  SmallerNoLine = "SmallerNoLine"
}

export interface IModuleHeader {
  type: ContentBlockType.ModuleHeader;
  title?: string;
  url?: string;
  variation?: ModuleHeaderVariation;
  color: AccentColor;
}
