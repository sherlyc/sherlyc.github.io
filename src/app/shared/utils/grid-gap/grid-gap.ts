import { IGridBlock } from "../../../../../common/__types__/IGridContainer";
import { flatten } from "lodash";

export function gridGapHandler(
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

export function gridBlockHandler(gridBlock: IGridBlock): IGridBlock {
  return {
    rowStart: getNewLineNumber(gridBlock.rowStart),
    rowSpan: getNewLineNumber(gridBlock.rowSpan),
    columnStart: getNewLineNumber(gridBlock.columnStart),
    columnSpan: getNewLineNumber(gridBlock.columnSpan)
  };
}

function getNewLineNumber(lineNumber: number): number {
  return Math.max(0, lineNumber * 2 - 1);
}
