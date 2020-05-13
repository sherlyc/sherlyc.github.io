import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  INewsSixGridV2HandlerInput,
  NewsSixV2GridPositions
} from "../../__types__/INewsSixGridV2HandlerInput";
import newsSixGridV2Handler from "./news-six-v2-grid";

describe("News Six Grid V2 handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: INewsSixGridV2HandlerInput = {
      type: HandlerInputType.NewsSixV2Grid,
      content: {
        [NewsSixV2GridPositions.ModuleTitle]: [fakeContentBlock],
        [NewsSixV2GridPositions.TopLeft]: [fakeContentBlock],
        [NewsSixV2GridPositions.MidFirst]: [fakeContentBlock],
        [NewsSixV2GridPositions.MidSecond]: [fakeContentBlock],
        [NewsSixV2GridPositions.TopRight]: [fakeContentBlock],
        [NewsSixV2GridPositions.BottomFirst]: [fakeContentBlock],
        [NewsSixV2GridPositions.BottomSecond]: [fakeContentBlock]
      }
    };

    const actual = await newsSixGridV2Handler(handlerRunnerMock, input, params);

    const expected: IContentBlock[] = [
      {
        type: ContentBlockType.GridContainer,
        items: {
          ModuleTitle: [fakeContentBlock],
          TopLeft: [fakeContentBlock],
          MidFirst: [fakeContentBlock],
          MidSecond: [fakeContentBlock],
          TopRight: [fakeContentBlock],
          BottomFirst: [fakeContentBlock],
          BottomSecond: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            ModuleTitle: {
              rowStart: 1,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            TopLeft: {
              rowStart: 2,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            MidFirst: {
              rowStart: 3,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: [Border.bottom]
            },
            MidSecond: {
              rowStart: 4,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            TopRight: {
              rowStart: 5,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            BottomFirst: {
              rowStart: 6,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: [Border.bottom]
            },
            BottomSecond: {
              rowStart: 7,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: [Border.bottom]
            }
          }
        },
        tablet: {
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            ModuleTitle: {
              rowStart: 1,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 2,
              border: []
            },
            TopLeft: {
              rowStart: 2,
              rowSpan: 2,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            MidFirst: {
              rowStart: 2,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: [Border.bottom]
            },
            MidSecond: {
              rowStart: 3,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: []
            },
            TopRight: {
              rowStart: 4,
              rowSpan: 2,
              columnStart: 2,
              columnSpan: 1,
              border: []
            },
            BottomFirst: {
              rowStart: 4,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            BottomSecond: {
              rowStart: 5,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            }
          }
        },
        desktop: {
          gridTemplateColumns: "2fr 1fr 1fr",
          gridTemplateRows: "auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            ModuleTitle: {
              rowStart: 1,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 3,
              border: []
            },
            TopLeft: {
              rowStart: 2,
              rowSpan: 2,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            MidFirst: {
              rowStart: 2,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: [Border.bottom]
            },
            MidSecond: {
              rowStart: 3,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: []
            },
            TopRight: {
              rowStart: 2,
              rowSpan: 2,
              columnStart: 3,
              columnSpan: 1,
              border: []
            },
            BottomFirst: {
              rowStart: 4,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            BottomSecond: {
              rowStart: 4,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 2,
              border: []
            }
          }
        }
      }
    ];

    expect(actual).toEqual(expected);
  });
});
