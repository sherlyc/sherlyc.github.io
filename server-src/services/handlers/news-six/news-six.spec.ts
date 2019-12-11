import { INewsSixHandlerInput } from "../__types__/INewsSixHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import newsSixHandler, { NewsSixPositions } from "./news-six";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { IGridContainer } from "../../../../common/__types__/IGridContainer";

jest.mock("../../adapters/article-retriever/article-retriever");

describe("News six handler", () => {
  const article = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

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

  const articleAsBigImageArticleUnit: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: "1",
    strapName: "Strap Name",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleAsBasicArticleTitle: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "1",
    strapName: "Strap Name",
    indexHeadline: "Headline 1",
    title: "Title One",
    lastPublishedTime: 1,
    linkUrl: "/link1",
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
    (getRawArticles as jest.Mock).mockResolvedValue([
      article,
      article,
      article,
      article,
      article,
      article
    ]);

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
      items: {
        [NewsSixPositions.BigTopLeft]: articleAsBasicArticleUnit,
        [NewsSixPositions.SmallTopRight]: articleAsBigImageArticleUnit,
        [NewsSixPositions.SmallBottomFirst]: articleAsBasicArticleTitle,
        [NewsSixPositions.SmallBottomSecond]: articleAsBasicArticleTitle,
        [NewsSixPositions.SmallBottomThird]: articleAsBasicArticleTitle,
        [NewsSixPositions.SmallBottomFourth]: articleAsBasicArticleTitle
      },
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

  it("should throw an error when number of articles receive is insufficient", async () => {
    const handlerRunner = jest.fn();
    (getRawArticles as jest.Mock).mockResolvedValue([article, article]);

    await expect(
      newsSixHandler(handlerRunner, handlerInput, params)
    ).rejects.toThrowError(
      "News Six handler error: Insufficient number of articles: 2"
    );
  });
});
