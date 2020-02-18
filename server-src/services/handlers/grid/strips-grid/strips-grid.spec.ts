import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  IStripsGridHandlerInput,
  StripsGridPositions
} from "../../__types__/IStripsGridHandlerInput";
import stripsGridHandler from "./strips-grid";

describe("Strips grid handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate the grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;

    const input: IStripsGridHandlerInput = {
      type: HandlerInputType.StripsGrid,
      content: {
        [StripsGridPositions.ModuleTitle]: [fakeContentBlock],
        [StripsGridPositions.FirstRow1]: [fakeContentBlock]
      }
    };

    const result = await stripsGridHandler(handlerRunnerMock, input, params);

    expect(result).toEqual([
      {
        type: ContentBlockType.GridContainer,
        items: {
          [StripsGridPositions.ModuleTitle]: [fakeContentBlock],
          [StripsGridPositions.FirstRow1]: [fakeContentBlock]
        },
        mobile: {
          gridTemplateColumns: "1fr",
          gridTemplateRows: "auto auto",
          gridColumnGap: "0",
          gridRowGap: "20px",
          gridBlocks: {
            [StripsGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
            [StripsGridPositions.FirstRow1]: gridBlock(2, 1, 1, 1, [])
          }
        }
      }
    ]);
  });
});
