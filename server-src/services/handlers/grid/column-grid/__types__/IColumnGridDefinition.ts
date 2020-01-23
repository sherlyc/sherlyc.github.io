import { Border } from "../../../../../../common/__types__/IGridContainer";

export interface IColumnGridConfig {
  [key: number]: Array<{
    rowStart: number;
    colStart: number;
    border: Border[];
  }>;
}

export interface IColumnGridTemplate {
  [key: number]: string;
}
