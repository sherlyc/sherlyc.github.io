import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IGridBlock {
  rowStart: number;
  rowSpan: number;
  columnStart: number;
  columnSpan: number;
}

export interface IGridConfig {
  gridTemplateColumns: string;
  gridGap: string;
  gridBlocks: IGridBlock[];
}

export interface IGridContainer {
  type: ContentBlockType.GridContainer;
  items: IContentBlock[];
  mobile: IGridConfig;
  tablet: IGridConfig;
  desktop: IGridConfig;
}
