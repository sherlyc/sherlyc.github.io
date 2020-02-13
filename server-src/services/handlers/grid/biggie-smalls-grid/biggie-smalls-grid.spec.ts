import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  BiggieSmallsGridPositions,
  IBiggieSmallsGridHandlerInput
} from "../../__types__/IBiggieSmallsGridHandlerInput";
import biggieSmallsGridHandler from "./biggie-smalls-grid";

describe("Biggie Smalls grid handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: IBiggieSmallsGridHandlerInput = {
      type: HandlerInputType.BiggieSmallsGrid,
      content: {
        [BiggieSmallsGridPositions.ModuleTitle]: [fakeContentBlock],
        [BiggieSmallsGridPositions.Highlight]: [fakeContentBlock],
        [BiggieSmallsGridPositions.Right]: [fakeContentBlock],
        [BiggieSmallsGridPositions.FirstRow1]: [fakeContentBlock],
        [BiggieSmallsGridPositions.FirstRow2]: [fakeContentBlock],
        [BiggieSmallsGridPositions.FirstRow3]: [fakeContentBlock]
      }
    };

    const result = await biggieSmallsGridHandler(
      handlerRunnerMock,
      input,
      params
    );

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: {
          [BiggieSmallsGridPositions.ModuleTitle]: [fakeContentBlock],
          [BiggieSmallsGridPositions.Highlight]: [fakeContentBlock],
          [BiggieSmallsGridPositions.Right]: [fakeContentBlock],
          [BiggieSmallsGridPositions.FirstRow1]: [fakeContentBlock],
          [BiggieSmallsGridPositions.FirstRow2]: [fakeContentBlock],
          [BiggieSmallsGridPositions.FirstRow3]: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [BiggieSmallsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
            [BiggieSmallsGridPositions.Highlight]: gridBlock(2, 1, 1, 1, []),
            [BiggieSmallsGridPositions.Right]: gridBlock(6, 1, 1, 1, []),
            [BiggieSmallsGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
            [BiggieSmallsGridPositions.FirstRow2]: gridBlock(5, 1, 1, 1, [
              Border.top
            ]),
            [BiggieSmallsGridPositions.FirstRow3]: gridBlock(4, 1, 1, 1, [
              Border.top
            ])
          }
        },
        tablet: {
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [BiggieSmallsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
            [BiggieSmallsGridPositions.Highlight]: gridBlock(2, 1, 1, 3, [
              Border.bottom
            ]),
            [BiggieSmallsGridPositions.Right]: gridBlock(3, 3, 2, 1, []),
            [BiggieSmallsGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
            [BiggieSmallsGridPositions.FirstRow2]: gridBlock(3, 2, 2, 1, []),
            [BiggieSmallsGridPositions.FirstRow3]: gridBlock(4, 1, 1, 1, [])
          }
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr 1fr 300px",
          gridTemplateRows: "auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [BiggieSmallsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
            [BiggieSmallsGridPositions.Highlight]: gridBlock(2, 1, 1, 3, [
              Border.bottom
            ]),
            [BiggieSmallsGridPositions.Right]: gridBlock(2, 4, 3, 1, []),
            [BiggieSmallsGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
            [BiggieSmallsGridPositions.FirstRow2]: gridBlock(3, 2, 1, 1, []),
            [BiggieSmallsGridPositions.FirstRow3]: gridBlock(3, 3, 1, 1, [])
          }
        }
      }
    ]);
  });
});
