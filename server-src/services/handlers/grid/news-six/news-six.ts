import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { NewsSixPositions } from "./NewsSixPositions";
import newsSixContentCreator from "./news-six-content";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    sourceId,
    type,
    strapName,
    displayNameColor
  }: INewsSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const contentBlocks = await newsSixContentCreator(
    strapName,
    sourceId,
    params
  );

  contentBlocks[NewsSixPositions.ModuleTitle] = {
    type: ContentBlockType.ModuleTitle,
    displayName,
    displayNameColor
  };

  const desktop = {
    [NewsSixPositions.ModuleTitle]: {
      rowStart: 1,
      rowSpan: 1,
      columnStart: 1,
      columnSpan: 5
    },
    [NewsSixPositions.BigTopLeft]: {
      rowStart: 2,
      rowSpan: 1,
      columnStart: 1,
      columnSpan: 4
    },
    [NewsSixPositions.SmallTopRight]: {
      rowStart: 2,
      rowSpan: 2,
      columnStart: 5,
      columnSpan: 1
    },
    [NewsSixPositions.SmallBottomFirst]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 1,
      columnSpan: 1
    },
    [NewsSixPositions.SmallBottomSecond]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 2,
      columnSpan: 1
    },
    [NewsSixPositions.SmallBottomThird]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 3,
      columnSpan: 1
    },
    [NewsSixPositions.SmallBottomFourth]: {
      rowStart: 3,
      rowSpan: 1,
      columnStart: 4,
      columnSpan: 1
    }
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: contentBlocks,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto",
        gridGap: "10px",
        gridBlocks: {
          [NewsSixPositions.ModuleTitle]: {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 5,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 6,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
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
