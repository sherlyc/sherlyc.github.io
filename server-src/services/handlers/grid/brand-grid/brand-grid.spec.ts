import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IBrandGridHandlerInput,
  BrandGridPositions
} from "../../__types__/IBrandGridHandlerInput";
import brandGridHandler from "./brand-grid";
import { IParams } from "../../../__types__/IParams";
import {
  Border,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

describe("Brand Grid Handler", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  it("should create grid", async () => {
    const fakeContentBlock = {} as IContentBlock;
    const content = {
      [BrandGridPositions.ModuleTitle]: [],
      [BrandGridPositions.FirstRow]: [fakeContentBlock, fakeContentBlock],
      [BrandGridPositions.SecondRow]: [fakeContentBlock]
    };
    const input: IBrandGridHandlerInput = {
      type: HandlerInputType.BrandGrid,
      content
    };

    const result = await brandGridHandler(handlerRunner, input, params);

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: {
          [BrandGridPositions.ModuleTitle]: {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1,
            border: []
          },
          [BrandGridPositions.FirstRow]: {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1,
            border: [Border.bottom]
          },
          [BrandGridPositions.SecondRow]: {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1,
            border: []
          }
        }
      }
    };

    expect(result).toEqual([expected]);
  });
});
