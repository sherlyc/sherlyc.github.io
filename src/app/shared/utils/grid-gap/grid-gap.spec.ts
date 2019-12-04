import gridGap from "./grid-gap";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";

describe("grip gap helper", () => {
  it("should add grip gap to grid template rows and columns", () => {
    const gridConfig = {
      gridTemplateColumns: "1fr 1fr 1fr 1fr 200px",
      gridTemplateRows: "auto",
      gridGap: "20px",
      gridBlocks: [
        {
          rowStart: 0,
          rowSpan: 0,
          columnStart: 0,
          columnSpan: 0
        }
      ]
    } as IGridConfig;

    const expectedConfig = {
      gridTemplateColumns: "1fr 20px 1fr 20px 1fr 20px 1fr 20px 200px",
      gridTemplateRows: "auto",
      gridGap: "0",
      gridBlocks: [
        {
          rowStart: 0,
          rowSpan: 0,
          columnStart: 0,
          columnSpan: 0
        }
      ]
    } as IGridConfig;

    expect(gridGap(gridConfig)).toEqual(expectedConfig);
  });

  it("should handle multiple grid blocks", () => {
    const config = {
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gridTemplateRows: "auto auto auto",
      gridGap: "100px",
      gridBlocks: [
        {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 2
        },
        {
          rowStart: 2,
          rowSpan: 2,
          columnStart: 1,
          columnSpan: 1
        },
        {
          rowStart: 2,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 3
        },
        {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 3,
          columnSpan: 2
        },
        {
          rowStart: 3,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 3
        }
      ]
    } as IGridConfig;

    const expected = {
      gridTemplateColumns: "1fr 100px 1fr 100px 1fr 100px 1fr",
      gridTemplateRows: "auto 100px auto 100px auto",
      gridGap: "0",
      gridBlocks: [
        {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 3
        },
        {
          rowStart: 3,
          rowSpan: 3,
          columnStart: 1,
          columnSpan: 1
        },
        {
          rowStart: 3,
          rowSpan: 1,
          columnStart: 3,
          columnSpan: 5
        },
        {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 5,
          columnSpan: 3
        },
        {
          rowStart: 5,
          rowSpan: 1,
          columnStart: 3,
          columnSpan: 5
        }
      ]
    } as IGridConfig;

    expect(gridGap(config)).toEqual(expected);
  });
});
