import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  BrandGridPositions,
  IBrandGridHandlerInput
} from "../../__types__/IBrandGridHandlerInput";
import brandGridHandler from "./brand-grid";

describe("Brand Grid Handler", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const fakeContentBlock = {} as IContentBlock;

  it("should create grid", async () => {
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

    const grid = {
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
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "10px",
        gridBlocks: grid
      },
      tablet: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "20px",
        gridBlocks: grid
      },
      desktop: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "0px",
        gridRowGap: "20px",
        gridBlocks: grid
      }
    };

    expect(result).toEqual([expected]);
  });

  it("should remove first row border bottom if second row content is empty", async () => {
    const content = {
      [BrandGridPositions.ModuleTitle]: [],
      [BrandGridPositions.FirstRow]: [fakeContentBlock, fakeContentBlock],
      [BrandGridPositions.SecondRow]: []
    };
    const input: IBrandGridHandlerInput = {
      type: HandlerInputType.BrandGrid,
      content
    };

    const [actualGridContainer] = await brandGridHandler(
      handlerRunner,
      input,
      params
    );

    const expectedGridBlocks = {
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
        border: []
      },
      [BrandGridPositions.SecondRow]: {
        rowStart: 3,
        rowSpan: 1,
        columnStart: 1,
        columnSpan: 1,
        border: []
      }
    };
    expect((actualGridContainer as IGridContainer).mobile.gridBlocks).toEqual(
      expectedGridBlocks
    );
  });
});
