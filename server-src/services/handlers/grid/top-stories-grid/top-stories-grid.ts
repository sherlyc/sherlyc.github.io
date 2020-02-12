import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import {
  Border,
  IGridBlocks,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridBlocks = {
    [TopStoriesGridPositions.Highlight]: gridBlock(1, 1, 1, 4, [Border.bottom]),
    [TopStoriesGridPositions.Right]: gridBlock(1, 5, 3, 1, []),
    [TopStoriesGridPositions.FirstRow1]: gridBlock(2, 1, 1, 1, []),
    [TopStoriesGridPositions.FirstRow2]: gridBlock(2, 2, 1, 1, []),
    [TopStoriesGridPositions.FirstRow3]: gridBlock(2, 3, 1, 1, []),
    [TopStoriesGridPositions.FirstRow4]: gridBlock(2, 4, 1, 1, []),
    [TopStoriesGridPositions.SecondRow1]: gridBlock(3, 1, 1, 1, []),
    [TopStoriesGridPositions.SecondRow2]: gridBlock(3, 2, 1, 1, []),
    [TopStoriesGridPositions.SecondRow3]: gridBlock(3, 3, 1, 1, []),
    [TopStoriesGridPositions.SecondRow4]: gridBlock(3, 4, 1, 1, [])
  };

  const tablet: IGridBlocks = {
    [TopStoriesGridPositions.Highlight]: gridBlock(1, 1, 1, 4, [Border.bottom]),
    [TopStoriesGridPositions.Right]: gridBlock(2, 3, 2, 2, []),
    [TopStoriesGridPositions.FirstRow1]: gridBlock(2, 1, 1, 1, []),
    [TopStoriesGridPositions.FirstRow2]: gridBlock(2, 2, 1, 1, []),
    [TopStoriesGridPositions.FirstRow3]: gridBlock(3, 1, 1, 1, []),
    [TopStoriesGridPositions.FirstRow4]: gridBlock(3, 2, 1, 1, []),
    [TopStoriesGridPositions.SecondRow1]: gridBlock(4, 1, 1, 1, []),
    [TopStoriesGridPositions.SecondRow2]: gridBlock(4, 2, 1, 1, []),
    [TopStoriesGridPositions.SecondRow3]: gridBlock(4, 3, 1, 1, []),
    [TopStoriesGridPositions.SecondRow4]: gridBlock(4, 4, 1, 1, [])
  };

  const mobile: IGridBlocks = {
    [TopStoriesGridPositions.Highlight]: gridBlock(1, 1, 1, 1, []),
    [TopStoriesGridPositions.Right]: gridBlock(2, 1, 1, 1, []),
    [TopStoriesGridPositions.FirstRow1]: gridBlock(3, 1, 1, 1, []),
    [TopStoriesGridPositions.FirstRow2]: gridBlock(4, 1, 1, 1, [Border.top]),
    [TopStoriesGridPositions.FirstRow3]: gridBlock(5, 1, 1, 1, [Border.top]),
    [TopStoriesGridPositions.FirstRow4]: gridBlock(6, 1, 1, 1, [Border.top]),
    [TopStoriesGridPositions.SecondRow1]: gridBlock(7, 1, 1, 1, [Border.top]),
    [TopStoriesGridPositions.SecondRow2]: gridBlock(8, 1, 1, 1, [Border.top]),
    [TopStoriesGridPositions.SecondRow3]: gridBlock(9, 1, 1, 1, [Border.top]),
    [TopStoriesGridPositions.SecondRow4]: gridBlock(10, 1, 1, 1, [Border.top])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: mobile
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: tablet
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktop
      }
    } as IGridContainer
  ];
}
