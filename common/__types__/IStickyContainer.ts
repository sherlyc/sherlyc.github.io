import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IStickyContainer {
  type: ContentBlockType.StickyContainer;
  items: IContentBlock[];
}
