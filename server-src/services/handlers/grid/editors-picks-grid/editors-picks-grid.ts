import { repeat } from "lodash-es";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import {
  EditorsPicksGridPositions,
  IEditorsPicksGridHandlerInput
} from "../../__types__/IEditorsPicksGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: IEditorsPicksGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: repeat(" auto", 6).substring(1),
    gridColumnGap: "20px",
    gridRowGap: "20px",
    gridBlocks: {
      [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
      [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowThree]: gridBlock(3, 1, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowFour]: gridBlock(3, 2, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowOne]: gridBlock(4, 1, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(4, 2, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowThree]: gridBlock(5, 1, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowFour]: gridBlock(5, 2, 1, 1, []),
      [EditorsPicksGridPositions.Ad]: gridBlock(6, 1, 1, 2, [])
    }
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 300px",
    gridTemplateRows: repeat(" auto", 5).substring(1),
    gridRowGap: "20px",
    gridColumnGap: "20px",
    gridBlocks: {
      [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 3, []),
      [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowThree]: gridBlock(3, 1, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowFour]: gridBlock(3, 2, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowOne]: gridBlock(4, 1, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(4, 2, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowThree]: gridBlock(5, 1, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowFour]: gridBlock(5, 2, 1, 1, []),
      [EditorsPicksGridPositions.Ad]: gridBlock(2, 3, 4, 1, [])
    }
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
    gridTemplateRows: "auto auto auto",
    gridRowGap: "20px",
    gridColumnGap: "20px",
    gridBlocks: {
      [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 5, []),
      [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowThree]: gridBlock(2, 3, 1, 1, []),
      [EditorsPicksGridPositions.FirstRowFour]: gridBlock(2, 4, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowOne]: gridBlock(3, 1, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(3, 2, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowThree]: gridBlock(3, 3, 1, 1, []),
      [EditorsPicksGridPositions.SecondRowFour]: gridBlock(3, 4, 1, 1, []),
      [EditorsPicksGridPositions.Ad]: gridBlock(2, 5, 2, 1, [])
    }
  };
  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile,
      tablet,
      desktop
    }
  ];
}
