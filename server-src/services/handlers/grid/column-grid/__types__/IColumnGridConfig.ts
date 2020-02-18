import { Border } from "../../../../../../common/__types__/IGridContainer";

export interface IColumnGridConfig {
  [key: number]: {
    gridTemplateColumns: string;
    gridTemplateRows: string;
    gridColumnGap: string;
    gridRowGap: string;
    gridBlocks: IColumnGridBlock[];
  };
}

export interface IColumnGridBlock {
  rowStart: number;
  colStart: number;
  border: Border[];
}
