import { INewsSixHandlerInput } from "../../__types__/INewsSixHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import newsSixContentCreator from "./news-six-content";
import { IBasicArticleUnit } from "../../../../../common/__types__/IBasicArticleUnit";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBigImageArticleUnit } from "../../../../../common/__types__/IBigImageArticleUnit";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { NewsSixPositions } from "./NewsSixPositions";
import logger from "../../../utils/logger";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../utils/logger");

describe("News six content creator", () => {
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

  it("generate correct content blocks for each position", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([
      article,
      article,
      article,
      article,
      article,
      article
    ]);

    const contentBlocks = await newsSixContentCreator(
      handlerInput.strapName,
      handlerInput.sourceId,
      params
    );

    expect(getRawArticles).toHaveBeenCalledWith(Strap.National, 6, params);
    expect(contentBlocks).toEqual({
      [NewsSixPositions.BigTopLeft]: articleAsBasicArticleUnit,
      [NewsSixPositions.SmallTopRight]: articleAsBigImageArticleUnit,
      [NewsSixPositions.SmallBottomFirst]: articleAsBasicArticleTitle,
      [NewsSixPositions.SmallBottomSecond]: articleAsBasicArticleTitle,
      [NewsSixPositions.SmallBottomThird]: articleAsBasicArticleTitle,
      [NewsSixPositions.SmallBottomFourth]: articleAsBasicArticleTitle
    });
  });

  it("should throw error if fails to create content block", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([article]);

    expect.assertions(2);
    try {
      await newsSixContentCreator(
        handlerInput.strapName,
        handlerInput.sourceId,
        params
      );
    } catch (error) {
      expect(logger.error).toHaveBeenCalledWith(
        params.apiRequestId,
        expect.stringContaining(
          `News Six handler error: Potentially insufficient number of articles: 1. Strap name: ${handlerInput.sourceId}|${handlerInput.strapName}`
        )
      );
      expect(error).toBeTruthy();
    }
  });
});
