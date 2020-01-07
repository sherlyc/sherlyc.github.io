import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { ITopStoriesArticleListHandlerInput } from "../__types__/ITopStoriesArticleListHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import handlerRunner from "../runner";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IParams } from "../../__types__/IParams";
import topStoriesListHandler from "./top-stories-article-list";
import { IDefconArticleUnit } from "../../../../common/__types__/IDefconArticleUnit";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import * as layoutRetriever from "../../adapters/layout/layout-retriever";
import { LayoutType } from "../../adapters/__types__/LayoutType";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IGrayDefconArticleUnit } from "../../../../common/__types__/IGrayDefconArticleUnit";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";

import {
  Border,
  IGridBlock
} from "../../../../common/__types__/IGridContainer";

jest.mock("../../adapters/article-retriever/article-retriever");

describe("Top Stories Article List", () => {
  const strapName = "Latest";

  const basicAdUnit = {
    type: "BasicAdUnit",
    context: strapName
  };

  const articleOne: IRawArticle = {
    id: "1",
    indexHeadline: "Article One",
    title: "Title One",
    introText: "Article One Intro",
    linkUrl: "/link1",
    imageSrc: "article.jpg",
    imageSrcSet: "article.jpg 1w",
    defconSrc: "defcon.jpg",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwo: IRawArticle = {
    id: "2",
    indexHeadline: "An Article",
    title: "Title Two",
    introText: "Article Text",
    linkUrl: "/link1",
    imageSrc: "article.jpg",
    imageSrcSet: "article.jpg 1w",
    defconSrc: null,
    strapImageSrc: "strap2.jpg",
    strapImageSrcSet: "strap2.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const AsDefconArticle = (article: IRawArticle): IDefconArticleUnit => ({
    type: ContentBlockType.DefconArticleUnit,
    id: article.id,
    strapName: strapName,
    indexHeadline: article.indexHeadline,
    title: article.title,
    introText: article.introText,
    linkUrl: article.linkUrl,
    imageSrc: article.defconSrc,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  });

  const AsBasicArticle = (article: IRawArticle): IBasicArticleUnit => ({
    type: ContentBlockType.BasicArticleUnit,
    id: article.id,
    strapName: strapName,
    indexHeadline: article.indexHeadline,
    title: article.title,
    introText: article.introText,
    linkUrl: article.linkUrl,
    imageSrc: article.imageSrc,
    imageSrcSet: article.imageSrcSet,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  });

  const AsGrayDefconArticle = (
    article: IRawArticle
  ): IGrayDefconArticleUnit => ({
    type: ContentBlockType.GrayDefconArticleUnit,
    id: article.id,
    strapName: strapName,
    indexHeadline: article.indexHeadline,
    title: article.title,
    introText: article.introText,
    linkUrl: article.linkUrl,
    imageSrc: article.defconSrc,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  });

  const AsBigImageArticle = (article: IRawArticle): IBigImageArticleUnit => ({
    type: ContentBlockType.BigImageArticleUnit,
    id: article.id,
    strapName: strapName,
    indexHeadline: article.indexHeadline,
    title: article.title,
    introText: article.introText,
    linkUrl: article.linkUrl,
    imageSrc: article.strapImageSrc,
    imageSrcSet: article.strapImageSrcSet,
    lastPublishedTime: article.lastPublishedTime,
    headlineFlags: article.headlineFlags
  });

  beforeEach(() => {
    jest.resetModules();
  });

  describe("when version is lower than 1.500", () => {
    const params: IParams = {
      apiRequestId: "request-id-for-testing",
      version: "1.490"
    };

    it("should swap first and second articles and return them as basic articles when layout is default", async () => {
      jest
        .spyOn(layoutRetriever, "layoutRetriever")
        .mockResolvedValue(LayoutType.DEFAULT);

      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        strapName
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        {
          type: "ExperimentContainer",
          name: "TopStoriesVisualExperiment",
          variants: {
            control: [
              basicAdUnit,
              AsBasicArticle(articleTwo),
              basicAdUnit,
              AsBasicArticle(articleOne),
              basicAdUnit
            ],
            groupOne: [
              basicAdUnit,
              AsBigImageArticle(articleTwo),
              basicAdUnit,
              AsBigImageArticle(articleOne),
              basicAdUnit
            ]
          }
        }
      ];

      const contentBlocks = await topStoriesListHandler(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it("should return first article as defcon and others as basic articles when layout is defcon", async () => {
      jest
        .spyOn(layoutRetriever, "layoutRetriever")
        .mockResolvedValue(LayoutType.DEFCON);

      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        strapName
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        {
          type: "ExperimentContainer",
          name: "TopStoriesVisualExperiment",
          variants: {
            control: [
              basicAdUnit,
              AsDefconArticle(articleOne),
              basicAdUnit,
              AsBasicArticle(articleTwo),
              basicAdUnit
            ],
            groupOne: [
              basicAdUnit,
              AsGrayDefconArticle(articleOne),
              basicAdUnit,
              AsBigImageArticle(articleTwo),
              basicAdUnit
            ]
          }
        }
      ];

      const contentBlocks = await topStoriesListHandler(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it("should throw error when failing to retrieve articles", async () => {
      jest
        .spyOn(layoutRetriever, "layoutRetriever")
        .mockResolvedValue(LayoutType.DEFCON);
      const error = new Error("failed to retrieve");
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        strapName
      };

      (getRawArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        topStoriesListHandler(handlerRunner, handlerInput, params)
      ).rejects.toEqual(error);
    });
  });
  describe("when version is equal of higher than 1.500", () => {
    const params: IParams = {
      apiRequestId: "request-id-for-testing",
      version: "1.501"
    };

    it("should swap first and second articles and return them as basic articles when layout is default", async () => {
      jest
        .spyOn(layoutRetriever, "layoutRetriever")
        .mockResolvedValue(LayoutType.DEFAULT);

      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        strapName
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        {
          type: ContentBlockType.GridContainer,
          items: {
            item0: [basicAdUnit],
            item1: [AsBigImageArticle(articleTwo)],
            item2: [basicAdUnit],
            item3: [AsBigImageArticle(articleOne)],
            item4: [basicAdUnit],
            item5: [undefined],
            item6: [basicAdUnit],
            item7: [undefined],
            item8: [basicAdUnit],
            item9: [undefined],
            item10: [basicAdUnit],
            item11: [undefined],
            item12: [basicAdUnit]
          },
          mobile: {
            gridTemplateColumns: "1fr",
            gridTemplateRows:
              "auto auto auto auto auto auto auto auto auto auto auto auto ",
            gridRowGap: "auto",
            gridColumnGap: "20px",
            gridBlocks: {
              item0: gridBlock(1, 1, 1, 1, []),
              item1: gridBlock(2, 1, 1, 1, [Border.bottom]),
              item2: gridBlock(3, 1, 1, 1, []),
              item3: gridBlock(4, 1, 1, 1, [Border.bottom]),
              item4: gridBlock(5, 1, 1, 1, []),
              item5: gridBlock(6, 1, 1, 1, [Border.bottom]),
              item6: gridBlock(7, 1, 1, 1, []),
              item7: gridBlock(8, 1, 1, 1, [Border.bottom]),
              item8: gridBlock(9, 1, 1, 1, []),
              item9: gridBlock(10, 1, 1, 1, [Border.bottom]),
              item10: gridBlock(11, 1, 1, 1, []),
              item11: gridBlock(12, 1, 1, 1, [Border.bottom]),
              item12: gridBlock(13, 1, 1, 1, [])
            }
          },
          tablet: {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows:
              "auto auto auto auto auto auto auto auto auto auto",
            gridRowGap: "auto",
            gridColumnGap: "20px",
            gridBlocks: {
              item0: gridBlock(1, 1, 1, 2, []),
              item1: gridBlock(3, 1, 1, 1, [Border.bottom]),
              item2: gridBlock(2, 1, 1, 2, []),
              item3: gridBlock(3, 2, 1, 1, [Border.bottom]),
              item4: gridBlock(4, 1, 1, 2, []),
              item5: gridBlock(6, 1, 1, 1, [Border.bottom]),
              item6: gridBlock(5, 1, 1, 2, []),
              item7: gridBlock(6, 2, 1, 1, [Border.bottom]),
              item8: gridBlock(7, 1, 1, 2, []),
              item9: gridBlock(9, 1, 1, 1, [Border.bottom]),
              item10: gridBlock(8, 1, 1, 2, []),
              item11: gridBlock(9, 2, 1, 1, [Border.bottom]),
              item12: gridBlock(10, 1, 1, 2, [])
            }
          },
          desktop: {
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto auto auto auto auto auto auto auto ",
            gridRowGap: "auto",
            gridColumnGap: "20px",
            gridBlocks: {
              item0: gridBlock(1, 1, 1, 3, []),
              item1: gridBlock(4, 1, 1, 1, [Border.bottom]),
              item2: gridBlock(2, 1, 1, 3, []),
              item3: gridBlock(4, 2, 1, 1, [Border.bottom]),
              item4: gridBlock(3, 1, 1, 3, []),
              item5: gridBlock(4, 3, 1, 1, [Border.bottom]),
              item6: gridBlock(5, 1, 1, 3, []),
              item7: gridBlock(8, 1, 1, 1, [Border.bottom]),
              item8: gridBlock(6, 1, 1, 3, []),
              item9: gridBlock(8, 2, 1, 1, [Border.bottom]),
              item10: gridBlock(7, 1, 1, 3, []),
              item11: gridBlock(8, 3, 1, 1, [Border.bottom]),
              item12: gridBlock(9, 1, 1, 3, [])
            }
          }
        }
      ];

      const contentBlocks = await topStoriesListHandler(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it("should return first article as defcon and others as basic articles when layout is defcon", async () => {
      jest
        .spyOn(layoutRetriever, "layoutRetriever")
        .mockResolvedValue(LayoutType.DEFCON);

      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        strapName
      };
      const rawArticles = [articleOne, articleTwo];

      (getRawArticles as jest.Mock).mockResolvedValueOnce(rawArticles);

      const expectedContentBlocks = [
        {
          type: ContentBlockType.GridContainer,
          items: {
            item0: [basicAdUnit],
            item1: [AsGrayDefconArticle(articleOne)],
            item2: [basicAdUnit],
            item3: [AsBigImageArticle(articleTwo)],
            item4: [basicAdUnit],
            item5: [undefined],
            item6: [basicAdUnit],
            item7: [undefined],
            item8: [basicAdUnit],
            item9: [undefined],
            item10: [basicAdUnit],
            item11: [undefined],
            item12: [basicAdUnit]
          },
          mobile: {
            gridTemplateColumns: "1fr",
            gridTemplateRows:
              "auto auto auto auto auto auto auto auto auto auto auto auto ",
            gridRowGap: "auto",
            gridColumnGap: "20px",
            gridBlocks: {
              item0: gridBlock(1, 1, 1, 1, []),
              item1: gridBlock(2, 1, 1, 1, [Border.bottom]),
              item2: gridBlock(3, 1, 1, 1, []),
              item3: gridBlock(4, 1, 1, 1, [Border.bottom]),
              item4: gridBlock(5, 1, 1, 1, []),
              item5: gridBlock(6, 1, 1, 1, [Border.bottom]),
              item6: gridBlock(7, 1, 1, 1, []),
              item7: gridBlock(8, 1, 1, 1, [Border.bottom]),
              item8: gridBlock(9, 1, 1, 1, []),
              item9: gridBlock(10, 1, 1, 1, [Border.bottom]),
              item10: gridBlock(11, 1, 1, 1, []),
              item11: gridBlock(12, 1, 1, 1, [Border.bottom]),
              item12: gridBlock(13, 1, 1, 1, [])
            }
          },
          tablet: {
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows:
              "auto auto auto auto auto auto auto auto auto auto",
            gridRowGap: "auto",
            gridColumnGap: "20px",
            gridBlocks: {
              item0: gridBlock(1, 1, 1, 2, []),
              item1: gridBlock(3, 1, 1, 1, [Border.bottom]),
              item2: gridBlock(2, 1, 1, 2, []),
              item3: gridBlock(3, 2, 1, 1, [Border.bottom]),
              item4: gridBlock(4, 1, 1, 2, []),
              item5: gridBlock(6, 1, 1, 1, [Border.bottom]),
              item6: gridBlock(5, 1, 1, 2, []),
              item7: gridBlock(6, 2, 1, 1, [Border.bottom]),
              item8: gridBlock(7, 1, 1, 2, []),
              item9: gridBlock(9, 1, 1, 1, [Border.bottom]),
              item10: gridBlock(8, 1, 1, 2, []),
              item11: gridBlock(9, 2, 1, 1, [Border.bottom]),
              item12: gridBlock(10, 1, 1, 2, [])
            }
          },
          desktop: {
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto auto auto auto auto auto auto auto ",
            gridRowGap: "auto",
            gridColumnGap: "20px",
            gridBlocks: {
              item0: gridBlock(1, 1, 1, 3, []),
              item1: gridBlock(4, 1, 1, 1, [Border.bottom]),
              item2: gridBlock(2, 1, 1, 3, []),
              item3: gridBlock(4, 2, 1, 1, [Border.bottom]),
              item4: gridBlock(3, 1, 1, 3, []),
              item5: gridBlock(4, 3, 1, 1, [Border.bottom]),
              item6: gridBlock(5, 1, 1, 3, []),
              item7: gridBlock(8, 1, 1, 1, [Border.bottom]),
              item8: gridBlock(6, 1, 1, 3, []),
              item9: gridBlock(8, 2, 1, 1, [Border.bottom]),
              item10: gridBlock(7, 1, 1, 3, []),
              item11: gridBlock(8, 3, 1, 1, [Border.bottom]),
              item12: gridBlock(9, 1, 1, 3, [])
            }
          }
        }
      ];

      const contentBlocks = await topStoriesListHandler(
        handlerRunner,
        handlerInput,
        params
      );

      expect(contentBlocks).toEqual(expectedContentBlocks);
    });

    it("should throw error when failing to retrieve articles", async () => {
      jest
        .spyOn(layoutRetriever, "layoutRetriever")
        .mockResolvedValue(LayoutType.DEFCON);

      const error = new Error("failed to retrieve");
      const handlerInput: ITopStoriesArticleListHandlerInput = {
        type: HandlerInputType.TopStoriesArticleList,
        strapName
      };

      (getRawArticles as jest.Mock).mockRejectedValue(error);

      await expect(
        topStoriesListHandler(handlerRunner, handlerInput, params)
      ).rejects.toEqual(error);
    });
  });
});

const gridBlock = (
  rowStart: number,
  columnStart: number,
  rowSpan: number,
  columnSpan: number,
  border: Border[]
): IGridBlock => ({
  rowStart,
  rowSpan,
  columnStart,
  columnSpan,
  border
});
