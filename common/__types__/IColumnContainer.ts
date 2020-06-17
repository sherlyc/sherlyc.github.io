import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IColumnContainer {
  type: ContentBlockType.ColumnContainer;
  items: IContentBlock[];
}
