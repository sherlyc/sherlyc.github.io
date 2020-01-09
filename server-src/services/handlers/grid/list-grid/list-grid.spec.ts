import { IListGridHandlerInput } from "../../__types__/IListGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import listGridHandler from "./list-grid";
import { IParams } from "../../../__types__/IParams";

describe("List Grid", () => {
  const contentBlock = {} as IContentBlock;
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  it("should create grid container with content passed in", async () => {
    const handlerInput: IListGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [contentBlock]
    };

    const layout = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks: {
        content0: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 1,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlock]
      },
      mobile: layout,
      tablet: layout,
      desktop: layout
    };

    const result = await listGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });
});
