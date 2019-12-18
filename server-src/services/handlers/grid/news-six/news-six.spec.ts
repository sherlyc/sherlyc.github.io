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
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";

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

  const moduleTitle: IModuleTitle = {
    type: ContentBlockType.ModuleTitle,
    displayName: "Module Title",
    displayNameColor: "darkblue"
  };

  const handlerInput: INewsSixHandlerInput = {
    type: HandlerInputType.NewsSix,
    displayName: "Display Name",
    displayNameColor: "darkblue",
    strapName: "Strap Name",
    sourceId: Strap.National
  };
  const params: IParams = { apiRequestId: "1" };

  it("should return content blocks with correct type", async () => {
    const handlerRunner = jest.fn();
    const gridItems = {
      [NewsSixPositions.ModuleTitle]: moduleTitle,
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
    const expectedGridContainer: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: gridItems,
      mobile: {
        gridGap: "10px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto auto auto auto auto auto",
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
        gridBlocks: desktopGridBlocks
      },
      desktop: {
        gridTemplateColumns: "1fr 1fr 1fr 1fr 300px",
        gridTemplateRows: "auto auto",
        gridGap: "20px",
        gridBlocks: desktopGridBlocks
      }
    };
    expect(contentBlocks).toEqual([expectedGridContainer]);
  });
});
