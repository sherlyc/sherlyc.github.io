import { IContentBlock } from "./IContentBlock";
import { ContentBlockType } from "./ContentBlockType";

export interface IColumnContainer {
  type: ContentBlockType.ColumnContainer;
  items: IContentBlock[];
}
