import topStoriesGridHandler from "./top-stories-grid";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";

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

    expect(result).toMatchInlineSnapshot(`
      Array [
        Object {
          "items": Object {
            "BigTopLeft": Array [
              Object {},
            ],
            "FirstRow1": Array [
              Object {},
            ],
            "FirstRow2": Array [
              Object {},
            ],
            "FirstRow3": Array [
              Object {},
            ],
            "FirstRow4": Array [
              Object {},
            ],
            "Right": Array [
              Object {},
            ],
            "SecondRow1": Array [
              Object {},
            ],
            "SecondRow2": Array [
              Object {},
            ],
            "SecondRow3": Array [
              Object {},
            ],
            "SecondRow4": Array [
              Object {},
            ],
          },
          "mobile": Object {
            "gridBlocks": Object {
              "BigTopLeft": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 1,
              },
              "FirstRow1": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 3,
              },
              "FirstRow2": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 4,
              },
              "FirstRow3": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 5,
              },
              "FirstRow4": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 6,
              },
              "Right": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 2,
              },
              "SecondRow1": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 7,
              },
              "SecondRow2": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 8,
              },
              "SecondRow3": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 9,
              },
              "SecondRow4": Object {
                "border": Array [
                  "top",
                ],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 10,
              },
            },
            "gridColumnGap": "20px",
            "gridRowGap": "20px",
            "gridTemplateColumns": "1fr",
            "gridTemplateRows": "auto auto auto auto auto auto auto auto auto auto",
          },
          "tablet": Object {
            "gridBlocks": Object {
              "BigTopLeft": Object {
                "border": Array [
                  "bottom",
                ],
                "columnSpan": 4,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 1,
              },
              "FirstRow1": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 2,
              },
              "FirstRow2": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 2,
                "rowSpan": 1,
                "rowStart": 2,
              },
              "FirstRow3": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 3,
                "rowSpan": 1,
                "rowStart": 2,
              },
              "FirstRow4": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 4,
                "rowSpan": 1,
                "rowStart": 2,
              },
              "Right": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 5,
                "rowSpan": 3,
                "rowStart": 1,
              },
              "SecondRow1": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 1,
                "rowSpan": 1,
                "rowStart": 3,
              },
              "SecondRow2": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 2,
                "rowSpan": 1,
                "rowStart": 3,
              },
              "SecondRow3": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 3,
                "rowSpan": 1,
                "rowStart": 3,
              },
              "SecondRow4": Object {
                "border": Array [],
                "columnSpan": 1,
                "columnStart": 4,
                "rowSpan": 1,
                "rowStart": 3,
              },
            },
            "gridColumnGap": "20px",
            "gridRowGap": "20px",
            "gridTemplateColumns": "1fr 1fr 1fr 1fr 300px",
            "gridTemplateRows": "auto auto auto",
          },
          "type": "GridContainer",
        },
      ]
    `);
  });
});
