import halfFourGrid from "./half-four-grid";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { HalfFourGridPositions, IHalfFourGridHandlerInput } from "../../__types__/IHalfFourGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Border } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

describe("Half Four Grid", () => {
  const handlerRunner = jest.fn();
  const params = { apiRequestId: "123" };

  it("should return correct grid", async () => {
    const fakeContent = {} as IContentBlock;
    const input: IHalfFourGridHandlerInput = {
      type: HandlerInputType.HalfFourGrid,
      content: {
        [HalfFourGridPositions.ModuleTitle]: [fakeContent],
        [HalfFourGridPositions.Left]: [fakeContent],
        [HalfFourGridPositions.RightOne]: [fakeContent],
        [HalfFourGridPositions.RightTwo]: [fakeContent],
        [HalfFourGridPositions.RightThree]: [fakeContent],
      }
    };

    const result = await halfFourGrid(handlerRunner, input, params);

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: input.content,
        mobile: {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto auto auto",
          gridColumnGap: "20px",
          gridRowGap: "20px",
          gridBlocks: {
            [HalfFourGridPositions.ModuleTitle]: {
              rowStart: 1,
              columnStart: 1,
              rowSpan: 1,
              columnSpan: 1,
              border: []
            },
            [HalfFourGridPositions.Left]: {
              rowStart: 2,
              columnStart: 1,
              rowSpan: 3,
              columnSpan: 1,
              border: []
            },
            [HalfFourGridPositions.RightOne]: {
              rowStart: 2,
              columnStart: 2,
              rowSpan: 1,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [HalfFourGridPositions.RightTwo]: {
              rowStart: 3,
              columnStart: 2,
              rowSpan: 1,
              columnSpan: 1,
              border: [Border.bottom]
            },
            [HalfFourGridPositions.RightThree]: {
              rowStart: 4,
              columnStart: 2,
              rowSpan: 1,
              columnSpan: 1,
              border: [Border.bottom]
            }
          }
        }
      }
    ]);
  });
});
