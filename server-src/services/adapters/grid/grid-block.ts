import {
  Border,
  IGridBlock
} from "../../../../common/__types__/IGridContainer";

export const gridBlock = (
  rowStart: number,
  columnStart: number,
  rowSpan: number,
  columnSpan: number,
  border: Border[]
): IGridBlock => ({
  rowStart,
  rowSpan,
  columnStart,
  columnSpan,
  border
});
