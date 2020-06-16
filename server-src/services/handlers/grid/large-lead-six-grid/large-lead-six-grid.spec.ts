import { IParams } from "../../../__types__/IParams";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions,
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridConfig,
  IGridContainer,
} from "../../../../../common/__types__/IGridContainer";
import largeLeadSixGrid from "./large-lead-six-grid";

describe("Large Lead Six Grid", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const fakeContentBlock = {} as IContentBlock;

  it("should generate grid", async () => {
    const handlerInput: ILargeLeadSixGridHandlerInput = {
      type: HandlerInputType.LargeLeadSixGrid,
      content: {
        [LargeLeadSixGridPositions.ModuleTitle]: [fakeContentBlock],
        [LargeLeadSixGridPositions.Left]: [fakeContentBlock],
        [LargeLeadSixGridPositions.Middle]: [fakeContentBlock],
        [LargeLeadSixGridPositions.Right]: [fakeContentBlock],
      },
    };

    const desktop: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: "auto auto",
      gridColumnGap: "40px",
      gridRowGap: "40px",
      gridBlocks: {
        [LargeLeadSixGridPositions.ModuleTitle]: {
          columnStart: 1,
          columnSpan: 3,
          rowStart: 1,
          rowSpan: 1,
          border: [],
        },
        [LargeLeadSixGridPositions.Left]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom],
        },
        [LargeLeadSixGridPositions.Middle]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom],
        },
        [LargeLeadSixGridPositions.Right]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [],
        },
      },
    };

    const tablet: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: "auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixGridPositions.ModuleTitle]: {
          columnStart: 1,
          columnSpan: 3,
          rowStart: 1,
          rowSpan: 1,
          border: [],
        },
        [LargeLeadSixGridPositions.Left]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom],
        },
        [LargeLeadSixGridPositions.Middle]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom],
        },
        [LargeLeadSixGridPositions.Right]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [],
        },
      },
    };

    const mobile: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "20px",
      gridBlocks: {
        [LargeLeadSixGridPositions.ModuleTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [],
        },
        [LargeLeadSixGridPositions.Left]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom],
        },
        [LargeLeadSixGridPositions.Middle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: [Border.bottom],
        },
        [LargeLeadSixGridPositions.Right]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: [],
        },
      },
    };

    const expectedGridContainer: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: handlerInput.content,
      desktop,
      tablet,
      mobile,
    };

    const result = await largeLeadSixGrid(handlerRunner, handlerInput, params);

    expect(result).toEqual([expectedGridContainer]);
  });
});
