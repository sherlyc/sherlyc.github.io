import topStoriesGridHandler from "./top-stories-grid";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

describe("Top Stories grid handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: ITopStoriesGridHandlerInput = {
      type: HandlerInputType.TopStoriesGrid,
      content: {
        [TopStoriesGridPositions.BigTopLeft]: [fakeContentBlock],
        [TopStoriesGridPositions.Right]: [fakeContentBlock],
        [TopStoriesGridPositions.FirstRow1]: [fakeContentBlock],
        [TopStoriesGridPositions.FirstRow2]: [fakeContentBlock],
        [TopStoriesGridPositions.FirstRow3]: [fakeContentBlock],
        [TopStoriesGridPositions.FirstRow4]: [fakeContentBlock],
        [TopStoriesGridPositions.SecondRow1]: [fakeContentBlock],
        [TopStoriesGridPositions.SecondRow2]: [fakeContentBlock],
        [TopStoriesGridPositions.SecondRow3]: [fakeContentBlock],
        [TopStoriesGridPositions.SecondRow4]: [fakeContentBlock]
      }
    };

    const result = await topStoriesGridHandler(
      handlerRunnerMock,
      input,
      params
    );

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: {
          [TopStoriesGridPositions.BigTopLeft]: [fakeContentBlock],
          [TopStoriesGridPositions.Right]: [fakeContentBlock],
          [TopStoriesGridPositions.FirstRow1]: [fakeContentBlock],
          [TopStoriesGridPositions.FirstRow2]: [fakeContentBlock],
          [TopStoriesGridPositions.FirstRow3]: [fakeContentBlock],
          [TopStoriesGridPositions.FirstRow4]: [fakeContentBlock],
          [TopStoriesGridPositions.SecondRow1]: [fakeContentBlock],
          [TopStoriesGridPositions.SecondRow2]: [fakeContentBlock],
          [TopStoriesGridPositions.SecondRow3]: [fakeContentBlock],
          [TopStoriesGridPositions.SecondRow4]: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [TopStoriesGridPositions.BigTopLeft]: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },
            [TopStoriesGridPositions.Right]: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },
            [TopStoriesGridPositions.FirstRow1]: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            [TopStoriesGridPositions.FirstRow2]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 4
            },
            [TopStoriesGridPositions.FirstRow3]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 5
            },
            [TopStoriesGridPositions.FirstRow4]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 6
            },
            [TopStoriesGridPositions.SecondRow1]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 7
            },
            [TopStoriesGridPositions.SecondRow2]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 8
            },
            [TopStoriesGridPositions.SecondRow3]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 9
            },
            [TopStoriesGridPositions.SecondRow4]: {
              border: [Border.top],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 10
            }
          }
        },
        tablet: {
          gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
          gridTemplateRows: "auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [TopStoriesGridPositions.BigTopLeft]: {
              border: [Border.bottom],
              columnSpan: 4,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1
            },
            [TopStoriesGridPositions.Right]: {
              border: [],
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 3,
              rowStart: 1
            },
            [TopStoriesGridPositions.FirstRow1]: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2
            },
            [TopStoriesGridPositions.FirstRow2]: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 2
            },
            [TopStoriesGridPositions.FirstRow3]: {
              border: [],
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 2
            },
            [TopStoriesGridPositions.FirstRow4]: {
              border: [],
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 2
            },
            [TopStoriesGridPositions.SecondRow1]: {
              border: [],
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3
            },
            [TopStoriesGridPositions.SecondRow2]: {
              border: [],
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3
            },
            [TopStoriesGridPositions.SecondRow3]: {
              border: [],
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 3
            },
            [TopStoriesGridPositions.SecondRow4]: {
              border: [],
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 3
            }
          }
        }
      }
    ]);
  });
});
