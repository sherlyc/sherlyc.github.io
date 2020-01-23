import { borderRight, isLastItemInRow } from "./border-helper";
import { Border, IGridBlocks } from "../../../../../common/__types__/IGridContainer";
import { IColumnGridConfig, tabletGridConfig } from "./column-grid-config";

describe("border calculator", () => {
  const gridBlocks: IGridBlocks = {
    content0: {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      border: []
    },
    content1: {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      border: []
    },
    content2: {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      border: []
    },
    content3: {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      border: []
    },
    content4: {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      border: []
    },
    content5: {
      columnStart: 1,
      columnSpan: 1,
      rowStart: 1,
      rowSpan: 1,
      border: []
    }
  };
  it("desktop one content", () => {
    const result = borderRight({
      content0: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      }});

    expect(result.content0.border).toEqual([]);

  });

  it("desktop two content", () => {
    const result = borderRight({
      content0: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      content1: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      }});

    expect(result.content1.border).toEqual([]);

  });

  it("desktop", () => {
    const result = borderRight(gridBlocks);

    expect(result.content0.border).toEqual([Border.right]);
    expect(result.content1.border).toEqual([Border.right]);
    expect(result.content2.border).toEqual([]);
    expect(result.content3.border).toEqual([Border.right]);
    expect(result.content4.border).toEqual([Border.right]);
    expect(result.content5.border).toEqual([]);
    console.log(result);
  });

  it("tablet 4 columns", () => {
    const result = borderRight({
      content0: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      content1: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      },
      content2: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      },
      content3: {
        columnStart: 2,
        columnSpan: 1,
        rowStart: 2,
        rowSpan: 1,
        border: []
      }});

    // expect(result.content0.border).toEqual([Border.right]);
    // expect(result.content1.border).toEqual([]);
    // expect(result.content2.border).toEqual([Border.right]);
    // expect(result.content3.border).toEqual([]);
  });
  it("tablet 6 columns", () => {
    const result = borderRight(gridBlocks);

    expect(result.content0.border).toEqual([Border.right]);
    expect(result.content1.border).toEqual([Border.right]);
    expect(result.content2.border).toEqual([]);
    expect(result.content3.border).toEqual([Border.right]);
    expect(result.content4.border).toEqual([Border.right]);
    expect(result.content5.border).toEqual([]);

  });

  describe("for mobile config", () => {
    it.each([
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ])("row %i col %i should return true", (rowStart: number, colStart: number) => {
      const config = [
        [1, 1],
        [2, 1],
        [3, 1],
        [4, 1],
        [5, 1],
        [6, 1]
      ];

      const result = isLastItemInRow(rowStart, colStart, config);

      expect(result).toBeTruthy();
    });
  });

  describe("for tablet config", () => {
    it.each([
      [1, 1, false],
      [1, 2, true],
    ])("row %i col %i should return %s", (rowStart: number, colStart: number, expected: boolean) => {
      const config = [
        [1, 1],
        [1, 2]
      ];

      const result = isLastItemInRow(rowStart, colStart, config);

      expect(result).toBe(expected);
    });
  });
});
