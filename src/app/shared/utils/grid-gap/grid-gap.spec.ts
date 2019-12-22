import { gridBlockHandler, gridGapHandler } from "./grid-gap";
import { IGridBlock } from "../../../../../common/__types__/IGridContainer";

describe("grip gap helper", () => {
  it("should add grip gap to grid template rows/columns", () => {
    const template = "1fr 1fr 1fr 1fr 200px";
    const gap = "20px";
    const expected = "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px";
    expect(gridGapHandler(template, gap)).toEqual(expected);
  });

  it("should gap to grid block", () => {
    const gridBlock: IGridBlock = {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 2,
      columnSpan: 3
    };

    const expected: IGridBlock = {
      rowStart: 5,
      rowSpan: 1,
      columnStart: 3,
      columnSpan: 5
    };

    expect(gridBlockHandler(gridBlock)).toEqual(expected);
  });
});
