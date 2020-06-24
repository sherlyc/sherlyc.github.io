import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  GridContainerVariation,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  EditorsPicksGridPositions,
  IEditorsPicksGridHandlerInput
} from "../../__types__/IEditorsPicksGridHandlerInput";
import editorsPicksGrid from "./editors-picks-grid";

describe("Editors Picks grid", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const fakeContentBlock = {} as IContentBlock;
  const input: IEditorsPicksGridHandlerInput = {
    type: HandlerInputType.EditorsPicksGrid,
    content: {
      [EditorsPicksGridPositions.ModuleTitle]: [fakeContentBlock],
      [EditorsPicksGridPositions.FirstRowOne]: [fakeContentBlock],
      [EditorsPicksGridPositions.FirstRowTwo]: [fakeContentBlock],
      [EditorsPicksGridPositions.FirstRowThree]: [fakeContentBlock],
      [EditorsPicksGridPositions.FirstRowFour]: [fakeContentBlock],
      [EditorsPicksGridPositions.SecondRowOne]: [fakeContentBlock],
      [EditorsPicksGridPositions.SecondRowTwo]: [fakeContentBlock],
      [EditorsPicksGridPositions.SecondRowThree]: [fakeContentBlock],
      [EditorsPicksGridPositions.SecondRowFour]: [fakeContentBlock],
      [EditorsPicksGridPositions.Ad]: [fakeContentBlock]
    }
  };

  it("should create grid config", async () => {
    const { mobile, tablet, desktop, variation } = (
      await editorsPicksGrid(handlerRunnerMock, input, params)
    )[0] as IGridContainer;

    expect(mobile).toEqual({
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto auto auto auto auto auto",
      gridRowGap: "20px",
      gridColumnGap: "20px",
      gridBlocks: {
        [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
        [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowThree]: gridBlock(3, 1, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowFour]: gridBlock(3, 2, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowOne]: gridBlock(4, 1, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(4, 2, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowThree]: gridBlock(5, 1, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowFour]: gridBlock(5, 2, 1, 1, []),
        [EditorsPicksGridPositions.Ad]: gridBlock(6, 1, 1, 2, [])
      }
    });

    expect(tablet).toEqual({
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: "auto auto auto auto auto",
      gridRowGap: "20px",
      gridColumnGap: "20px",
      gridBlocks: {
        [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
        [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowThree]: gridBlock(3, 1, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowFour]: gridBlock(3, 2, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowOne]: gridBlock(4, 1, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(4, 2, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowThree]: gridBlock(5, 1, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowFour]: gridBlock(5, 2, 1, 1, []),
        [EditorsPicksGridPositions.Ad]: gridBlock(2, 3, 4, 1, [])
      }
    });

    expect(desktop).toEqual({
      gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
      gridTemplateRows: "auto auto auto",
      gridRowGap: "20px",
      gridColumnGap: "20px",
      gridBlocks: {
        [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 5, []),
        [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowThree]: gridBlock(2, 3, 1, 1, []),
        [EditorsPicksGridPositions.FirstRowFour]: gridBlock(2, 4, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowOne]: gridBlock(3, 1, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(3, 2, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowThree]: gridBlock(3, 3, 1, 1, []),
        [EditorsPicksGridPositions.SecondRowFour]: gridBlock(3, 4, 1, 1, []),
        [EditorsPicksGridPositions.Ad]: gridBlock(2, 5, 2, 1, [])
      }
    });

    expect(variation).toBe(GridContainerVariation.Border);
  });
});
