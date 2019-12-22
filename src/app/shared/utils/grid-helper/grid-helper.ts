import {
  Border,
  IGridBlock
} from "../../../../../common/__types__/IGridContainer";
import { flatten } from "lodash";

export function calculateGridGap(
  gridTemplateValues: string,
  gridGap: string
): string {
  const arrGridTemplate = gridTemplateValues.split(" ");
  const arrGridTemplateWithGap = arrGridTemplate.map((current, i) => {
    const isNotLastElement = i < arrGridTemplate.length - 1;
    return isNotLastElement ? [current, gridGap] : [current];
  });
  return flatten(arrGridTemplateWithGap).join(" ");
}

export function calculateCellGap(gridBlock: IGridBlock): IGridBlock {
  return {
    ...gridBlock,
    rowStart: getNewLineNumber(gridBlock.rowStart),
    rowSpan: getNewLineNumber(gridBlock.rowSpan),
    columnStart: getNewLineNumber(gridBlock.columnStart),
    columnSpan: getNewLineNumber(gridBlock.columnSpan)
  };
}

function getNewLineNumber(lineNumber: number): number {
  return Math.max(0, lineNumber * 2 - 1);
}

const borderFunctions: {
  [key in Border]: (gridBlock: IGridBlock) => IGridBlock;
} = {
  [Border.bottom]: calculateBorderCellBottom,
  [Border.top]: calculateBorderCellTop,
  [Border.left]: calculateBorderCellLeft,
  [Border.right]: calculateBorderCellRight
};

export const calculateBorderCell = (type: Border, gridBlock: IGridBlock) => {
  return borderFunctions[type](gridBlock);
};

export function calculateBorderCellBottom(gridBlock: IGridBlock): IGridBlock {
  return {
    ...gridBlock,
    rowStart: gridBlock.rowStart + gridBlock.rowSpan,
    rowSpan: 1
  };
}

export function calculateBorderCellTop(gridBlock: IGridBlock): IGridBlock {
  return {
    ...gridBlock,
    rowStart: gridBlock.rowStart - 1,
    rowSpan: 1
  };
}

export function calculateBorderCellLeft(gridBlock: IGridBlock): IGridBlock {
  return {
    ...gridBlock,
    columnStart: gridBlock.columnStart - 1,
    columnSpan: 1
  };
}

export function calculateBorderCellRight(gridBlock: IGridBlock): IGridBlock {
  return {
    ...gridBlock,
    columnStart: gridBlock.columnStart + gridBlock.columnSpan,
    columnSpan: 1
  };
}
