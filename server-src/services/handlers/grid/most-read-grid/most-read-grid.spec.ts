import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  GridContainerVariation,
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import {
  IMostReadGridHandlerInput,
  MostReadGridPositions
} from "../../__types__/IMostReadGridHandlerInput";
import mostReadGridHandler from "./most-read-grid";

describe("Most Read Grid Handler", () => {
  const handlerRunnerMock = jest.fn();
  const params = {} as IParams;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should generate grid with correct values", async () => {
    const fakeContentBlock = {} as IContentBlock;
    const input: IMostReadGridHandlerInput = {
      type: HandlerInputType.MostReadGrid,
      content: {
        [MostReadGridPositions.Left]: [fakeContentBlock],
        [MostReadGridPositions.Right]: [fakeContentBlock]
      }
    };

    const result = await mostReadGridHandler(handlerRunnerMock, input, params);

    expect(result[0]).toEqual(
      expect.objectContaining({
        type: ContentBlockType.GridContainer,
        items: {
          [MostReadGridPositions.Left]: [fakeContentBlock],
          [MostReadGridPositions.Right]: [fakeContentBlock]
        }
      })
    );

    const { mobile, tablet, desktop, variation } = result[0] as IGridContainer;
    const mobileConfig: IGridConfig = {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [MostReadGridPositions.Left]: gridBlock(1, 1, 1, 1, []),
        [MostReadGridPositions.Right]: gridBlock(2, 1, 1, 1, [])
      }
    };

    const tabletConfig: IGridConfig = {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [MostReadGridPositions.Left]: gridBlock(1, 1, 1, 1, []),
        [MostReadGridPositions.Right]: gridBlock(1, 2, 1, 1, [])
      }
    };

    const desktopConfig: IGridConfig = {
      gridTemplateColumns: "1fr 1fr 300px",
      gridTemplateRows: "auto",
      gridColumnGap: "20px",
      gridRowGap: "20px",
      gridBlocks: {
        [MostReadGridPositions.Left]: gridBlock(1, 1, 1, 2, []),
        [MostReadGridPositions.Right]: gridBlock(1, 3, 1, 1, [])
      }
    };

    expect(mobile).toEqual(mobileConfig);
    expect(tablet).toEqual(tabletConfig);
    expect(desktop).toEqual(desktopConfig);
    expect(variation).toBe(GridContainerVariation.Border);
  });
});
