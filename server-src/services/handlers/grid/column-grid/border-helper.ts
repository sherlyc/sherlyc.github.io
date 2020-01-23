import { Border, IGridBlocks } from "../../../../../common/__types__/IGridContainer";
import { IColumnGridConfig, tabletGridConfig } from "./column-grid-config";

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

export const isLastItemInRow = (rowStart: number, colStart: number, config: number[][]) => {
  const uniqueRows = config.reduce((acc, item) => {
    const [ row ] = item;
    return {
      ...acc,
      [row]: ""
    };
  }, {});
  console.log(uniqueRows);
  return true;
};
