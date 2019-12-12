import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import newsSixHandler from "./news-six";
import newsSixContentCreator from "./news-six-content";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicArticleUnit } from "../../../../../common/__types__/IBasicArticleUnit";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { NewsSixPositions } from "./NewsSixPositions";

jest.mock("./news-six-content");

describe("News six handler", () => {
  const articleAsBasicArticleUnit: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: "1",
    strapName: "Strap Name",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const handlerInput: INewsSixHandlerInput = {
    type: HandlerInputType.NewsSix,
    displayName: "Display Name",
    strapName: "Strap Name",
    sourceId: Strap.National
  };
  const params: IParams = { apiRequestId: "1" };

  it("should return content blocks with correct type", async () => {
    const handlerRunner = jest.fn();
    const gridItems = {
      [NewsSixPositions.BigTopLeft]: articleAsBasicArticleUnit,
      [NewsSixPositions.SmallTopRight]: articleAsBasicArticleUnit,
      [NewsSixPositions.SmallBottomFirst]: articleAsBasicArticleUnit,
      [NewsSixPositions.SmallBottomSecond]: articleAsBasicArticleUnit,
      [NewsSixPositions.SmallBottomThird]: articleAsBasicArticleUnit,
      [NewsSixPositions.SmallBottomFourth]: articleAsBasicArticleUnit
    };
    (newsSixContentCreator as jest.Mock).mockResolvedValue(gridItems);

    const contentBlocks = await newsSixHandler(
      handlerRunner,
      handlerInput,
      params
    );

    const desktopGridBlocks = {
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
    };
    const expectedGridContainer: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: gridItems,
      mobile: {
        gridGap: "0px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto",
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
        gridBlocks: desktopGridBlocks
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "1fr 1fr 1fr 1fr",
        gridGap: "20px",
        gridBlocks: desktopGridBlocks
      }
    };
    expect(contentBlocks).toEqual([expectedGridContainer]);
  });
});
