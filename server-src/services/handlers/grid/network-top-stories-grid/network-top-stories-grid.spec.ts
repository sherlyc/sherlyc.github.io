import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  INetworkTopStoriesGridHandlerInput,
  NetworkTopStoriesGridPositions
} from "../../__types__/INetworkTopStoriesGridHandlerInput";
import networkTopStoriesGridHandler from "./network-top-stories-grid";
import { IParams } from "../../../__types__/IParams";
import { Border, IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

describe("Network Top Stories Grid Handler", () => {
  const handlerRunner = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  it("should create grid", async () => {
    const fakeContentBlock = {} as IContentBlock ;
    const content = {
      [NetworkTopStoriesGridPositions.ModuleTitle] : [],
      [NetworkTopStoriesGridPositions.FirstRow] : [fakeContentBlock, fakeContentBlock],
      [NetworkTopStoriesGridPositions.SecondRow] : [fakeContentBlock],
    };
    const input: INetworkTopStoriesGridHandlerInput = {
      type: HandlerInputType.NetworkTopStoriesGrid,
      content
    };

    const result = await networkTopStoriesGridHandler(handlerRunner, input, params);

    const expected: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: {
          [NetworkTopStoriesGridPositions.ModuleTitle]: {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1,
            border: []
          },
          [NetworkTopStoriesGridPositions.FirstRow]:  {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1,
            border: [Border.bottom]
          },
          [NetworkTopStoriesGridPositions.SecondRow]:  {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1,
            border: []
          },
        }
      }
    };

    expect(result).toEqual([expected]);
  });
});
