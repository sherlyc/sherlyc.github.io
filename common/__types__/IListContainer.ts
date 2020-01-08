import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IListContainer {
  type: ContentBlockType.ListContainer;
  items: IContentBlock[];
}
