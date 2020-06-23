import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
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

  it("should generate grid", async () => {
    const handlerInput: ILargeLeadSixV2GridHandlerInput = {
      type: HandlerInputType.LargeLeadSixV2Grid,
      content: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: [fakeContentBlock],
        [LargeLeadSixV2GridPositions.Left]: [fakeContentBlock],
        [LargeLeadSixV2GridPositions.Middle]: [fakeContentBlock],
        [LargeLeadSixV2GridPositions.Right]: [fakeContentBlock]
      }
    };

    const desktop: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: "auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: {
          columnStart: 1,
          columnSpan: 3,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Left]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Middle]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Right]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tablet: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: "auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: {
          columnStart: 1,
          columnSpan: 3,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Left]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Middle]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Right]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const mobile: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixV2GridPositions.ModuleTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Left]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Middle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        },
        [LargeLeadSixV2GridPositions.Right]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expectedGridContainer: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: handlerInput.content,
      desktop,
      tablet,
      mobile
    };

    const result = await largeLeadSixV2Grid(
      handlerRunner,
      handlerInput,
      params
    );

    expect(result).toEqual([expectedGridContainer]);
  });
});
