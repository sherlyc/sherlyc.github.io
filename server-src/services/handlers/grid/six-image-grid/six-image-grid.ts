import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  ISixImageGridHandlerInput,
  SixImageGridHandlerPositions
} from "../../__types__/ISixImageGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { gridBlock } from "../../../adapters/grid/grid-block";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: ISixImageGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktopAndTablet = {
    [SixImageGridHandlerPositions.ModuleTitle]: gridBlock(1, 1, 1, 4, []),
    [SixImageGridHandlerPositions.FirstRowLeft]: gridBlock(2, 1, 1, 1, []),
    [SixImageGridHandlerPositions.FirstRowMiddle]: gridBlock(2, 2, 1, 1, []),
    [SixImageGridHandlerPositions.FirstRowRight]: gridBlock(2, 3, 1, 1, []),
    [SixImageGridHandlerPositions.SecondRowLeft]: gridBlock(3, 1, 1, 1, []),
    [SixImageGridHandlerPositions.SecondRowMiddle]: gridBlock(3, 2, 1, 1, []),
    [SixImageGridHandlerPositions.SecondRowRight]: gridBlock(3, 3, 1, 1, []),
    [SixImageGridHandlerPositions.BigRight]: gridBlock(2, 4, 2, 1, [])
  };

  const mobile = {
    [SixImageGridHandlerPositions.ModuleTitle]: gridBlock(1, 1, 1, 2, []),
    [SixImageGridHandlerPositions.FirstRowLeft]: gridBlock(2, 1, 1, 1, []),
    [SixImageGridHandlerPositions.FirstRowMiddle]: gridBlock(2, 2, 1, 1, []),
    [SixImageGridHandlerPositions.FirstRowRight]: gridBlock(3, 1, 1, 1, []),
    [SixImageGridHandlerPositions.SecondRowLeft]: gridBlock(3, 2, 1, 1, []),
    [SixImageGridHandlerPositions.SecondRowMiddle]: gridBlock(4, 1, 1, 1, []),
    [SixImageGridHandlerPositions.SecondRowRight]: gridBlock(4, 2, 1, 1, []),
    [SixImageGridHandlerPositions.BigRight]: gridBlock(5, 1, 1, 2, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktopAndTablet
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto auto",
        gridColumnGap: "20px",
        gridRowGap: "20px",
        gridBlocks: desktopAndTablet
      },
      mobile: {
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto auto",
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridBlocks: mobile
      }
    }
  ];
}
