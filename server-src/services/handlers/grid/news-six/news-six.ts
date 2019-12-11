import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { NewsSixPositions } from "./NewsSixPositions";
import newsSixContentCreator from "./news-six-content";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { displayName, sourceId, type, strapName }: INewsSixHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const contentBlocks = await newsSixContentCreator(
    strapName,
    sourceId,
    params
  );

  return [
    {
      type: ContentBlockType.GridContainer,
      items: contentBlocks,
      mobile: {
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
        gridGap: "0px",
        gridBlocks: {
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 1,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 2,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 3,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 5,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
            rowStart: 6,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          }
        }
      },
      tablet: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        gridGap: "10px",
        gridBlocks: {
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 1,
            columnSpan: 4
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 5,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 2,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 3,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 4,
            columnSpan: 1
          }
        }
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        gridGap: "20px",
        gridBlocks: {
          [NewsSixPositions.BigTopLeft]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 1,
            columnSpan: 4
          },
          [NewsSixPositions.SmallTopRight]: {
            rowStart: 1,
            rowSpan: 3,
            columnStart: 5,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFirst]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 1,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomSecond]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 2,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomThird]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 3,
            columnSpan: 1
          },
          [NewsSixPositions.SmallBottomFourth]: {
            rowStart: 4,
            rowSpan: 1,
            columnStart: 4,
            columnSpan: 1
          }
        }
      }
    }
  ];
}
