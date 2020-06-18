import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IContainer {
  type: ContentBlockType.Container;
  items: IContentBlock[];
}
