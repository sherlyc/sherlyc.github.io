import { IGridBlock } from "../../../../../common/__types__/IGridContainer";
import {
  calculateBorderCellBottom,
  calculateBorderCellLeft,
  calculateBorderCellRight,
  calculateBorderCellTop,
  calculateCellGap,
  calculateGridGap
} from "./grid-helper";

describe("grip gap helper", () => {
  it("should add grip gap to grid template rows/columns", () => {
    const template = "1fr 1fr 1fr 1fr 200px";
    const gap = "20px";
    const expected = "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px";
    expect(calculateGridGap(template, gap)).toEqual(expected);
  });

  it("should gap to grid block", () => {
    const gridBlock: IGridBlock = {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 2,
      columnSpan: 3,
      border: []
    };

    const expected: IGridBlock = {
      rowStart: 5,
      rowSpan: 1,
      columnStart: 3,
      columnSpan: 5,
      border: []
    };

    expect(calculateCellGap(gridBlock)).toEqual(expected);
  });

  it("should calculate the border cell bottom", () => {
    const gridBlock: IGridBlock = {
      columnStart: 2,
      columnSpan: 2,
      rowStart: 2,
      rowSpan: 2,
      border: []
    };
    const expected: IGridBlock = {
      columnStart: 2,
      columnSpan: 2,
      rowStart: 4,
      rowSpan: 1,
      border: []
    };

    const result = calculateBorderCellBottom(gridBlock);

    expect(result).toEqual(expected);
  });
  it("should calculate the border cell top", () => {
    const gridBlock: IGridBlock = {
      columnStart: 2,
      columnSpan: 2,
      rowStart: 2,
      rowSpan: 2,
      border: []
    };
    const expected: IGridBlock = {
      columnStart: 2,
      columnSpan: 2,
      rowStart: 1,
      rowSpan: 1,
      border: []
    };

    const result = calculateBorderCellTop(gridBlock);

    expect(result).toEqual(expected);
  });
  it("should calculate the border cell left", () => {
    const gridBlock: IGridBlock = {
      columnStart: 2,
      columnSpan: 2,
      rowStart: 2,
      rowSpan: 2,
      border: []
    };
    const expected: IGridBlock = {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 2,
      rowSpan: 2,
      border: []
    };

    const result = calculateBorderCellLeft(gridBlock);

    expect(result).toEqual(expected);
  });
  it("should calculate the border cell right", () => {
    const gridBlock: IGridBlock = {
      columnStart: 2,
      columnSpan: 2,
      rowStart: 2,
      rowSpan: 2,
      border: []
    };
    const expected: IGridBlock = {
      columnStart: 4,
      columnSpan: 1,
      rowStart: 2,
      rowSpan: 2,
      border: []
    };

    const result = calculateBorderCellRight(gridBlock);

    expect(result).toEqual(expected);
  });
});
