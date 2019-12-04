import {
  IGridConfig,
  IGridBlock
} from "../../../../../common/__types__/IGridContainer";
import { flatten } from "lodash";

export default function(config: IGridConfig): IGridConfig {
  const {
    gridTemplateColumns,
    gridTemplateRows = "",
    gridGap,
    gridBlocks
  } = config;

  return {
    gridTemplateColumns: gridGapHandler(gridTemplateColumns, gridGap),
    gridTemplateRows: gridGapHandler(gridTemplateRows, gridGap),
    gridGap: "0",
    gridBlocks: gridBlocksHandler(gridBlocks)
  };
}

function gridGapHandler(gridTemplateValues: string, gridGap: string): string {
  const arrGridTemplate = gridTemplateValues.split(" ");
  const arrGridTemplateWithGap = arrGridTemplate.map((current, i) => {
    const isNotLastElement = i < arrGridTemplate.length - 1;
    return isNotLastElement ? [current, gridGap] : [current];
  });

  return flatten(arrGridTemplateWithGap).join(" ");
}

function gridBlocksHandler(gridBlocks: IGridBlock[]): IGridBlock[] {
  return gridBlocks.map((grid) => {
    const { rowStart, rowSpan, columnStart, columnSpan } = grid;
    return {
      rowStart: getNewLineNumber(rowStart),
      rowSpan: getNewLineNumber(rowSpan),
      columnStart: getNewLineNumber(columnStart),
      columnSpan: getNewLineNumber(columnSpan)
    };
  });
}

function getNewLineNumber(lineNumber: number): number {
  return Math.max(0, lineNumber * 2 - 1);
}
