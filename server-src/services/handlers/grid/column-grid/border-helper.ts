import {
  Border,
  IGridBlocks
} from "../../../../../common/__types__/IGridContainer";
import { IColumnGridConfig, tabletGridConfig } from "./column-grid-config";
import { max } from "lodash";

export const borderRight = (gridBlocks: IGridBlocks) => {
  const count = Object.keys(gridBlocks).length;
  Object.keys(gridBlocks).forEach((content, index) => {
    if (index === count - 1 || (count === 6 && index === 2)) {
      gridBlocks[content].border = [];
    } else {
      gridBlocks[content].border = [Border.right];
    }
  });

  return gridBlocks;
};

export const isLastItemInRow = (
  rowStart: number,
  colStart: number,
  config: number[][]
) => {
  const rows = [...new Set(config.map((rowCol) => rowCol[0]))];

  const columnsByRow = rows.reduce((acc, row) => {
    const columnsInRow = config
      .filter((rowCol) => rowCol[0] === row)
      .map((rowCol) => rowCol[1]);
    return {
      ...acc,
      [row]: columnsInRow
    };
  }, {} as { [row: number]: number[] });

  return max(columnsByRow[rowStart]) === colStart;
};
