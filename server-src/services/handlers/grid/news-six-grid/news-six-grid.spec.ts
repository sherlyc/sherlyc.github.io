import newsSixGridHandler from "./news-six-grid";
import {
  INewsSixGridHandlerInput,
  NewsSixGridPositions
} from "../../__types__/INewsSixGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

describe("News six grid handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: INewsSixGridHandlerInput = {
      type: HandlerInputType.NewsSixGrid,
      content: {
        [NewsSixGridPositions.ModuleTitle]: [fakeContentBlock],
        [NewsSixGridPositions.BigTopLeft]: [fakeContentBlock],
        [NewsSixGridPositions.SmallTopRight]: [fakeContentBlock],
        [NewsSixGridPositions.SmallBottomFirst]: [fakeContentBlock],
        [NewsSixGridPositions.SmallBottomSecond]: [fakeContentBlock],
        [NewsSixGridPositions.SmallBottomThird]: [fakeContentBlock],
        [NewsSixGridPositions.SmallBottomFourth]: [fakeContentBlock]
      }
    };

    const result = await newsSixGridHandler(handlerRunnerMock, input, params);

    const expected = [
      {
        type: ContentBlockType.GridContainer,
        items: {
          BigTopLeft: [fakeContentBlock],
          ModuleTitle: [fakeContentBlock],
          SmallBottomFirst: [fakeContentBlock],
          SmallBottomFourth: [fakeContentBlock],
          SmallBottomSecond: [fakeContentBlock],
          SmallBottomThird: [fakeContentBlock],
          SmallTopRight: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            BigTopLeft: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2,
              border: ["bottom"]
            },
            ModuleTitle: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1,
              border: []
            },
            SmallBottomFirst: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 4,
              border: ["bottom"]
            },
            SmallBottomFourth: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 7,
              border: []
            },
            SmallBottomSecond: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 5,
              border: ["bottom"]
            },
            SmallBottomThird: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 6,
              border: ["bottom"]
            },
            SmallTopRight: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3,
              border: ["bottom"]
            }
          }
        },
        tablet: {
          gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
          gridTemplateRows: "auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            BigTopLeft: {
              columnSpan: 4,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2,
              border: ["bottom"]
            },
            ModuleTitle: {
              columnSpan: 5,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1,
              border: []
            },
            SmallBottomFirst: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3,
              border: ["right"]
            },
            SmallBottomFourth: {
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 3,
              border: []
            },
            SmallBottomSecond: {
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3,
              border: ["right"]
            },
            SmallBottomThird: {
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 3,
              border: ["right"]
            },
            SmallTopRight: {
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 2,
              rowStart: 2,
              border: ["left"]
            }
          }
        },
        desktop: {
          gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
          gridTemplateRows: "auto auto auto",
          gridColumnGap: "40px",
          gridRowGap: "40px",
          gridBlocks: {
            BigTopLeft: {
              columnSpan: 4,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 2,
              border: ["bottom"]
            },
            ModuleTitle: {
              columnSpan: 5,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 1,
              border: []
            },
            SmallBottomFirst: {
              columnSpan: 1,
              columnStart: 1,
              rowSpan: 1,
              rowStart: 3,
              border: ["right"]
            },
            SmallBottomFourth: {
              columnSpan: 1,
              columnStart: 4,
              rowSpan: 1,
              rowStart: 3,
              border: []
            },
            SmallBottomSecond: {
              columnSpan: 1,
              columnStart: 2,
              rowSpan: 1,
              rowStart: 3,
              border: ["right"]
            },
            SmallBottomThird: {
              columnSpan: 1,
              columnStart: 3,
              rowSpan: 1,
              rowStart: 3,
              border: ["right"]
            },
            SmallTopRight: {
              columnSpan: 1,
              columnStart: 5,
              rowSpan: 2,
              rowStart: 2,
              border: ["left"]
            }
          }
        }
      }
    ];

    expect(result).toEqual(expected);
  });
});
