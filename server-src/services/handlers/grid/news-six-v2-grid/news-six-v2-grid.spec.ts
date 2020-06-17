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
        [NewsSixV2GridPositions.One]: [fakeContentBlock],
        [NewsSixV2GridPositions.Two]: [fakeContentBlock],
        [NewsSixV2GridPositions.Three]: [fakeContentBlock],
        [NewsSixV2GridPositions.Four]: [fakeContentBlock],
        [NewsSixV2GridPositions.Five]: [fakeContentBlock],
        [NewsSixV2GridPositions.Six]: [fakeContentBlock]
      }
    };

    const actual = await newsSixGridV2Handler(handlerRunnerMock, input, params);

    const expected: IContentBlock[] = [
      {
        type: ContentBlockType.GridContainer,
        items: {
          [NewsSixV2GridPositions.ModuleTitle]: [fakeContentBlock],
          [NewsSixV2GridPositions.One]: [fakeContentBlock],
          [NewsSixV2GridPositions.Two]: [fakeContentBlock],
          [NewsSixV2GridPositions.Three]: [fakeContentBlock],
          [NewsSixV2GridPositions.Four]: [fakeContentBlock],
          [NewsSixV2GridPositions.Five]: [fakeContentBlock],
          [NewsSixV2GridPositions.Six]: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [NewsSixV2GridPositions.ModuleTitle]: {
              rowStart: 1,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.One]: {
              rowStart: 2,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Two]: {
              rowStart: 3,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [NewsSixV2GridPositions.Three]: {
              rowStart: 4,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Four]: {
              rowStart: 5,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Five]: {
              rowStart: 6,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [NewsSixV2GridPositions.Six]: {
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
            [NewsSixV2GridPositions.ModuleTitle]: {
              rowStart: 1,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 2,
              border: []
            },
            [NewsSixV2GridPositions.One]: {
              rowStart: 2,
              rowSpan: 2,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Two]: {
              rowStart: 2,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [NewsSixV2GridPositions.Three]: {
              rowStart: 3,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Four]: {
              rowStart: 4,
              rowSpan: 2,
              columnStart: 2,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Five]: {
              rowStart: 4,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Six]: {
              rowStart: 5,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            }
          }
        },
        desktop: {
          gridTemplateColumns: "2fr 1fr 300px",
          gridTemplateRows: "auto auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [NewsSixV2GridPositions.ModuleTitle]: {
              rowStart: 1,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 3,
              border: []
            },
            [NewsSixV2GridPositions.One]: {
              rowStart: 2,
              rowSpan: 3,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Two]: {
              rowStart: 2,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [NewsSixV2GridPositions.Three]: {
              rowStart: 3,
              rowSpan: 1,
              columnStart: 2,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [NewsSixV2GridPositions.Four]: {
              rowStart: 2,
              rowSpan: 3,
              columnStart: 3,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Five]: {
              rowStart: 5,
              rowSpan: 1,
              columnStart: 1,
              columnSpan: 1,
              border: []
            },
            [NewsSixV2GridPositions.Six]: {
              rowStart: 5,
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
