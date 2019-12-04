import { ContentBlockType } from "./ContentBlockType";

export interface IBasicAdUnit {
  type: ContentBlockType.BasicAdUnit;
  context: string;
}
