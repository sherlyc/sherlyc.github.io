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
        [RelevantStoriesGridPositions.FirstColumnTitle]: [contentWithId(1)],
        [RelevantStoriesGridPositions.FirstColumnContent]: [contentWithId(2)],
        [RelevantStoriesGridPositions.SecondColumnTitle]: [contentWithId(3)],
        [RelevantStoriesGridPositions.SecondColumnContent]: [contentWithId(4)],
        [RelevantStoriesGridPositions.ThirdColumnTitle]: [contentWithId(5)],
        [RelevantStoriesGridPositions.ThirdColumnContent]: [contentWithId(6)],
        [RelevantStoriesGridPositions.Right]: [contentWithId(7)]
      }
    };

    const result = await relevantStoriesGrid(handlerRunner, input, params);

    const mobile: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto auto auto auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.FirstColumnTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.FirstColumnContent]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.SecondColumnTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.SecondColumnContent]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 4,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.ThirdColumnTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 5,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.ThirdColumnContent]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 6,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.Right]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 7,
          rowSpan: 1,
          border: []
        }
      }
    };

    const tablet: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "auto auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.FirstColumnTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.FirstColumnContent]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.SecondColumnTitle]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.SecondColumnContent]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.ThirdColumnTitle]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.ThirdColumnContent]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.Right]: {
          columnStart: 1,
          columnSpan: 3,
          rowStart: 3,
          rowSpan: 1,
          border: [Border.right]
        }
      }
    };

    const desktop: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 1fr 300px",
      gridTemplateRows: "auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [RelevantStoriesGridPositions.FirstColumnTitle]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.FirstColumnContent]: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.SecondColumnTitle]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.SecondColumnContent]: {
          columnStart: 2,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.ThirdColumnTitle]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        },
        [RelevantStoriesGridPositions.ThirdColumnContent]: {
          columnStart: 3,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.right]
        },
        [RelevantStoriesGridPositions.Right]: {
          columnStart: 4,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 2,
          border: [Border.right]
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
