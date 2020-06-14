import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  EditorsPicksGridPositions,
  IEditorsPicksGridHandlerInput,
} from "../../__types__/IEditorsPicksGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  Border,
  IGridConfig,
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: IEditorsPicksGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop: IGridConfig = {
    gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
    gridTemplateRows: "auto auto auto",
    gridRowGap: "40px",
    gridColumnGap: "20px",
    gridBlocks: {
      [EditorsPicksGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 5, []),
      [EditorsPicksGridPositions.FirstRowOne]: gridBlock(2, 1, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.FirstRowTwo]: gridBlock(2, 2, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.FirstRowThree]: gridBlock(2, 3, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.FirstRowFour]: gridBlock(2, 4, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.SecondRowOne]: gridBlock(3, 1, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.SecondRowTwo]: gridBlock(3, 2, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.SecondRowThree]: gridBlock(3, 3, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.SecondRowFour]: gridBlock(3, 4, 1, 1, [
        Border.bottom,
      ]),
      [EditorsPicksGridPositions.Ad]: gridBlock(2, 5, 2, 1, []),
    },
  };
  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: desktop,
      tablet: desktop,
      desktop,
    },
  ];
}
