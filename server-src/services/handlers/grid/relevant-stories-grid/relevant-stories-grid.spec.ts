import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IParams } from "../../../__types__/IParams";
import relevantStoriesGrid from "./relevant-stories-grid";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

describe("Relevant stories grid", () => {
  const params: IParams = { apiRequestId: "123" };

  it("should create correct grid", async () => {
    const handlerRunner = jest.fn();
    const input: IRelevantStoriesGridHandlerInput = {
      type: HandlerInputType.RelevantStoriesGrid,
      content: {
        [RelevantStoriesGridPositions.Left]: [],
        [RelevantStoriesGridPositions.Right]: []
      }
    };

    const result = await relevantStoriesGrid(handlerRunner, input, params);

    const expectedMobileAndTablet: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "0px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.Left]: {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.Right]: {
          rowStart: 2,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1,
          border: []
        }
      }
    };

    const expectedDesktop: IGridConfig = {
      gridTemplateColumns: "1fr 300px",
      gridTemplateRows: "auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.Left]: {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 1,
          columnSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.Right]: {
          rowStart: 1,
          rowSpan: 1,
          columnStart: 2,
          columnSpan: 1,
          border: []
        }
      }
    };

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: input.content,
        mobile: expectedMobileAndTablet,
        tablet: expectedMobileAndTablet,
        desktop: expectedDesktop
      }
    ]);
  });
});
