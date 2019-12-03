import {
  IGridConfig,
  IGridBlock
} from '../../../../common/__types__/IGridContainer';

export default function(config: IGridConfig) {
  const {
    gridTemplateColumns,
    gridTemplateRows = '',
    gridGap,
    gridBlocks
  } = config;
  return {
    gridTemplateColumns: gridGapHandler(gridTemplateColumns, gridGap),
    gridTemplateRows: gridGapHandler(gridTemplateRows, gridGap),
    gridGap: '0',
    gridBlocks: gridBlocksHandler(gridBlocks)
  };
}

function gridGapHandler(gridTemplateValues: string, gridGap: string) {
  if (gridTemplateValues) {
    const arrGridTemplate = gridTemplateValues.split(' ');
    const arrGridTemplateWithGap = arrGridTemplate.map((e, i) =>
      i < arrGridTemplate.length - 1 ? [e, gridGap] : [e]
    );

    return ([] as any[]).concat(...arrGridTemplateWithGap).join(' ');
  }
}

function gridBlocksHandler(gridBlocks: IGridBlock[]) {
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

function getNewLineNumber(lineNumber: number) {
  return Math.max(0, lineNumber * 2 - 1);
}
