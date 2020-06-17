import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import topStoriesGridHandler from "./top-stories-grid";

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
        [TopStoriesGridPositions.Highlight]: [fakeContentBlock],
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
          [TopStoriesGridPositions.Highlight]: [fakeContentBlock],
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
          gridColumnGap: "0px",
          gridRowGap: "20px",
          gridBlocks: {
            [TopStoriesGridPositions.Highlight]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 1,
              rowSpan: 1
            },
            [TopStoriesGridPositions.Right]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow1]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow2]: {
              border: [Border.top],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow3]: {
              border: [Border.top],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 5,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow4]: {
              border: [Border.top],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 6,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow1]: {
              border: [Border.top],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 7,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow2]: {
              border: [Border.top],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 8,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow3]: {
              border: [Border.top],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 9,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow4]: {
              border: [Border.top, Border.bottom],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 10,
              rowSpan: 1
            }
          }
        },
        tablet: {
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "auto auto auto auto",
          gridColumnGap: "10px",
          gridRowGap: "20px",
          gridBlocks: {
            [TopStoriesGridPositions.Highlight]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 4,
              rowStart: 1,
              rowSpan: 1
            },
            [TopStoriesGridPositions.Right]: {
              border: [],
              columnStart: 3,
              columnSpan: 2,
              rowStart: 2,
              rowSpan: 2
            },
            [TopStoriesGridPositions.FirstRow1]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow2]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow3]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow4]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow1]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow2]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow3]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow4]: {
              border: [],
              columnStart: 4,
              columnSpan: 1,
              rowStart: 4,
              rowSpan: 1
            }
          }
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
          gridTemplateRows: "auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "40px",
          gridBlocks: {
            [TopStoriesGridPositions.Highlight]: {
              border: [Border.bottom],
              columnStart: 1,
              columnSpan: 4,
              rowStart: 1,
              rowSpan: 1
            },
            [TopStoriesGridPositions.Right]: {
              border: [],
              columnStart: 5,
              columnSpan: 1,
              rowStart: 1,
              rowSpan: 3
            },
            [TopStoriesGridPositions.FirstRow1]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow2]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow3]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.FirstRow4]: {
              border: [],
              columnStart: 4,
              columnSpan: 1,
              rowStart: 2,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow1]: {
              border: [],
              columnStart: 1,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow2]: {
              border: [],
              columnStart: 2,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow3]: {
              border: [],
              columnStart: 3,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            },
            [TopStoriesGridPositions.SecondRow4]: {
              border: [],
              columnStart: 4,
              columnSpan: 1,
              rowStart: 3,
              rowSpan: 1
            }
          }
        }
      }
    ]);
  });
});
