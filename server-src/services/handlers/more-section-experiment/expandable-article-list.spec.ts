import expandableArticleList from "./expandable-article-list";
import { IExpandableArticleListHandlerInput } from "../__types__/IExpandableArticleListHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

jest.mock("../../adapters/article-retriever/article-retriever");

describe("Expandable article list", () => {
  const params: IParams = { apiRequestId: "123" };
  const strapName = "property";

  const articleOne: IRawArticle = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title 1",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    sixteenByNineSrc: null
  };

  const articleTwo: IRawArticle = {
    id: "2",
    indexHeadline: "Headline 2",
    title: "Title 2",
    introText: "Intro 2",
    linkUrl: "/link2",
    defconSrc: null,
    imageSrc: "2.jpg",
    imageSrcSet: "2.jpg 2w",
    strapImageSrc: "strap2.jpg",
    strapImageSrcSet: "strap2.jpg 1w",
    lastPublishedTime: 2,
    headlineFlags: [],
    sixteenByNineSrc: null
  };

  const articleOneAsBasicArticle: IBasicArticleUnit = {
    type: ContentBlockType.BasicArticleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title 1",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleTwoAsBasicArticleTitle: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "2",
    strapName,
    indexHeadline: "Headline 2",
    title: "Title 2",
    lastPublishedTime: 2,
    linkUrl: "/link2",
    headlineFlags: []
  };

  it("should call getRawArticles with total number of articles for all pages", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Property,
      strapName,
      basicArticlesPerPage: 2,
      basicTitleArticlesPerPage: 3,
      pages: 2
    };
    (getRawArticles as jest.Mock).mockResolvedValue([]);

    await expandableArticleList(handlerRunner, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.Property, 10, params);
  });

  it("should return articles as basic articles and title articles specified for a single page", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Property,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 1,
      pages: 1
    };

    const expectedContentBlocks = [
      articleOneAsBasicArticle,
      articleTwoAsBasicArticleTitle
    ];
    const rawArticles = [articleOne, articleTwo];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await expandableArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it("should return two pages of basic articles and title articles", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Property,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 2,
      pages: 2
    };

    const expectedContentBlocks = [
      articleOneAsBasicArticle,
      articleTwoAsBasicArticleTitle,
      articleTwoAsBasicArticleTitle,
      articleOneAsBasicArticle,
      articleTwoAsBasicArticleTitle,
      articleTwoAsBasicArticleTitle
    ];
    const rawArticles = [
      articleOne,
      articleTwo,
      articleTwo,
      articleOne,
      articleTwo,
      articleTwo
    ];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await expandableArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it("should return two unequal pages of basic articles and title articles", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Property,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 2,
      pages: 2
    };

    const expectedContentBlocks = [
      articleOneAsBasicArticle,
      articleTwoAsBasicArticleTitle,
      articleTwoAsBasicArticleTitle,
      articleOneAsBasicArticle
    ];
    const rawArticles = [articleOne, articleTwo, articleTwo, articleOne];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await expandableArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });

  it("should return a page of articles when api returns fewer than requested", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Property,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 2,
      pages: 2
    };

    const expectedContentBlocks = [articleOneAsBasicArticle];
    const rawArticles = [articleOne];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await expandableArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });
});
