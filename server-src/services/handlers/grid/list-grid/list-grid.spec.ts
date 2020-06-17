import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IListGridHandlerInput } from "../../__types__/IListGridHandlerInput";
import listGridHandler from "./list-grid";

describe("List Grid", () => {
  const contentBlockOne = { id: "1" } as IContentBlock;
  const contentBlockTwo = { id: "2" } as IContentBlock;
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  it("should create grid container with one content passed in", async () => {
    const handlerInput: IListGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [contentBlockOne]
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
        content0: [contentBlockOne]
      },
      mobile: layout
    };

    const result = await listGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });

  it("should create grid container with multiple contents passed in", async () => {
    const handlerInput: IListGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [contentBlockOne, contentBlockTwo, contentBlockOne]
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
          border: [Border.bottom]
        },
        content1: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 2,
          rowSpan: 1,
          border: [Border.bottom]
        },
        content2: {
          columnStart: 1,
          columnSpan: 1,
          rowStart: 3,
          rowSpan: 1,
          border: []
        }
      }
    };

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {
        content0: [contentBlockOne],
        content1: [contentBlockTwo],
        content2: [contentBlockOne]
      },
      mobile: layout
    };

    const result = await listGridHandler(handlerRunner, handlerInput, params);

    expect(result).toEqual([expected]);
  });
});
