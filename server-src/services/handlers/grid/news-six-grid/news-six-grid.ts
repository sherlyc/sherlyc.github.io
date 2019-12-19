import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  INewsSixGridHandlerInput,
  NewsSixGridPositions
} from "../../__types__/INewsSixGridHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: INewsSixGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const desktop = {
    [NewsSixGridPositions.ModuleTitle]: {
      rowStart: 1,
      rowSpan: 1,
      columnStart: 1,
      columnSpan: 5
    },
    [NewsSixGridPositions.BigTopLeft]: {
      rowStart: 2,
      rowSpan: 1,
      columnStart: 1,
      columnSpan: 4
    },
    [NewsSixGridPositions.SmallTopRight]: {
      rowStart: 2,
      rowSpan: 2,
      columnStart: 5,
      columnSpan: 1
    },
    [NewsSixGridPositions.SmallBottomFirst]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 1,
      columnSpan: 1
    },
    [NewsSixGridPositions.SmallBottomSecond]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 2,
      columnSpan: 1
    },
    [NewsSixGridPositions.SmallBottomThird]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 3,
      columnSpan: 1
    },
    [NewsSixGridPositions.SmallBottomFourth]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 4,
      columnSpan: 1
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: content,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto",
        gridGap: "10px",
        gridBlocks: {
          [NewsSixGridPositions.ModuleTitle]: {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixGridPositions.BigTopLeft]: {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixGridPositions.SmallTopRight]: {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixGridPositions.SmallBottomFirst]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixGridPositions.SmallBottomSecond]: {
            rowStart: 5,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixGridPositions.SmallBottomThird]: {
            rowStart: 6,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixGridPositions.SmallBottomFourth]: {
            rowStart: 7,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          }
        }
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto",
        gridGap: "10px",
        gridBlocks: desktop
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto",
        gridGap: "20px",
        gridBlocks: desktop
      }
    }
  ];
}
