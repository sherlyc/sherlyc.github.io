import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { HalfFourGridPositions, IHalfFourGridHandlerInput } from "../../__types__/IHalfFourGridHandlerInput";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { Border } from "../../../../../common/__types__/IGridContainer";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IHalfFourGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: {
          [HalfFourGridPositions.ModuleTitle]: gridBlock(1, 1, 1, 1, []),
          [HalfFourGridPositions.Left]: gridBlock(2, 1, 3, 1, []),
          [HalfFourGridPositions.RightOne]: gridBlock(2, 2, 1, 1, [Border.bottom]),
          [HalfFourGridPositions.RightTwo]: gridBlock(3, 2, 1, 1, [Border.bottom]),
          [HalfFourGridPositions.RightThree]: gridBlock(4, 2, 1, 1, [Border.bottom])
        }
      }
    }
  ];
}
