import {
  IRelevantStoriesGridHandlerInput,
  RelevantStoriesGridPositions
} from "../../__types__/IRelevantStoriesGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IParams } from "../../../__types__/IParams";
import relevantStoriesGrid from "./relevant-stories-grid";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";

describe("Relevant stories grid", () => {
  const params: IParams = { apiRequestId: "123" };

  it("should create correct grid", async () => {
    const handlerRunner = jest.fn();
    const contentWithId = (id: number) => ({ id: `${id}` } as IContentBlock);
    const input: IRelevantStoriesGridHandlerInput = {
      type: HandlerInputType.RelevantStoriesGrid,
      content: {
        [RelevantStoriesGridPositions.FirstColumn]: [contentWithId(1)],
        [RelevantStoriesGridPositions.SecondColumn]: [contentWithId(2)],
        [RelevantStoriesGridPositions.ThirdColumn]: [contentWithId(3)],
        [RelevantStoriesGridPositions.Right]: [contentWithId(4)]
      }
    };

    const result = await relevantStoriesGrid(handlerRunner, input, params);

    const mobile: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.FirstColumn]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [Border.bottom]
        },
        [RelevantStoriesGridPositions.SecondColumn]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom]
        },
        [RelevantStoriesGridPositions.ThirdColumn]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: [Border.bottom]
        },
        [RelevantStoriesGridPositions.Right]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tablet: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "40px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.FirstColumn]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.SecondColumn]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.ThirdColumn]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.Right]: {
          columnStart: 1,
          columnSpan: 3,
          rowStart: 2,
          rowSpan: 1,
          border: []
        }
      }
    };

    const desktop: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 1fr 300px",
      gridTemplateRows: "auto",
      gridColumnGap: "40px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.FirstColumn]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.SecondColumn]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.ThirdColumn]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.Right]: {
          columnStart: 4,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: input.content,
        mobile,
        tablet,
        desktop
      }
    ]);
  });
});
