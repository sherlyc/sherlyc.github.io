import { repeat } from "lodash-es";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ILargeLeadSixV2GridHandlerInput,
  LargeLeadSixV2GridPositions
} from "../../__types__/ILargeLeadSixV2GridHandlerInput";
import largeLeadSixV2Grid from "./large-lead-six-v2-grid";

describe("Large Lead Six V2 Grid", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const fakeContentBlock = {} as IContentBlock;
  const handlerInput: ILargeLeadSixV2GridHandlerInput = {
    type: HandlerInputType.LargeLeadSixV2Grid,
    content: {
      [LargeLeadSixV2GridPositions.ModuleTitle]: [fakeContentBlock],
      [LargeLeadSixV2GridPositions.Left]: [fakeContentBlock],
      [LargeLeadSixV2GridPositions.MiddleOne]: [fakeContentBlock],
      [LargeLeadSixV2GridPositions.MiddleTwo]: [fakeContentBlock],
      [LargeLeadSixV2GridPositions.MiddleThree]: [fakeContentBlock],
      [LargeLeadSixV2GridPositions.MiddleFour]: [fakeContentBlock],
      [LargeLeadSixV2GridPositions.Right]: [fakeContentBlock]
    }
  };

  it("should generate desktop grid", async () => {
    const desktop: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: repeat(" auto", 5).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
        [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 4, 1, []),
        [LargeLeadSixV2GridPositions.MiddleOne]: gridBlock(2, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleTwo]: gridBlock(3, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleThree]: gridBlock(4, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleFour]: gridBlock(5, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.Right]: gridBlock(2, 3, 4, 1, [])
      }
    };

    const [grid] = await largeLeadSixV2Grid(
      handlerRunner,
      handlerInput,
      params
    );

    expect((grid as IGridContainer).desktop).toEqual(desktop);
  });

  it("should generate tablet grid", async () => {
    const tablet: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: repeat(" auto", 5).substring(1),
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
        [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 4, 1, []),
        [LargeLeadSixV2GridPositions.MiddleOne]: gridBlock(2, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleTwo]: gridBlock(3, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleThree]: gridBlock(4, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleFour]: gridBlock(5, 2, 1, 1, []),
        [LargeLeadSixV2GridPositions.Right]: gridBlock(2, 3, 4, 1, [])
      }
    };

    const [grid] = await largeLeadSixV2Grid(
      handlerRunner,
      handlerInput,
      params
    );

    expect((grid as IGridContainer).tablet).toEqual(tablet);
  });

  it("should generate mobile grid", async () => {
    const mobile: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: repeat(" auto", 7).substring(1),
      gridColumnGap: "0px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
        [LargeLeadSixV2GridPositions.Left]: gridBlock(2, 1, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleOne]: gridBlock(3, 1, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleTwo]: gridBlock(4, 1, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleThree]: gridBlock(5, 1, 1, 1, []),
        [LargeLeadSixV2GridPositions.MiddleFour]: gridBlock(6, 1, 1, 1, []),
        [LargeLeadSixV2GridPositions.Right]: gridBlock(7, 1, 1, 1, [])
      }
    };

    const [grid] = await largeLeadSixV2Grid(
      handlerRunner,
      handlerInput,
      params
    );

    expect((grid as IGridContainer).mobile).toEqual(mobile);
  });
});
