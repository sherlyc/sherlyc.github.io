import { ContentBlockType } from "./ContentBlockType";
import { IContentBlock } from "./IContentBlock";

export interface IGridBlockStyle {
  msGridRow: number;
  msGridRowSpan: number;
  msGridColumn: number;
  msGridColumnSpan: number;
  gridRowStart: number;
  gridRowEnd: string;
  gridColumnStart: number;
  gridColumnEnd: string;
}

export enum Border {
  left = "left",
  bottom = "bottom",
  right = "right",
  top = "top"
}

export interface IGridBlock {
  rowStart: number;
  rowSpan: number;
  columnStart: number;
  columnSpan: number;
  border?: Border[];
}

export interface IGridBlocks {
  [key: string]: IGridBlock;
}

export interface IGridConfig {
  gridTemplateColumns: string;
  gridTemplateRows: string;
  gridGap: string;
  gridBlocks: IGridBlocks;
}

export interface IGridContainer {
  type: ContentBlockType.GridContainer;
  items: { [key: string]: IContentBlock[] };
  mobile: IGridConfig;
  tablet: IGridConfig;
  desktop: IGridConfig;
}
