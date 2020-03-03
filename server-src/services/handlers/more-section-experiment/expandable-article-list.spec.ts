import expandableArticleList from "./expandable-article-list";
import { IExpandableArticleListHandlerInput } from "../__types__/IExpandableArticleListHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import { getRawArticles } from "../../adapters/article-retriever/article-retriever";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

jest.mock("../../adapters/article-retriever/article-retriever");

describe("Expandable article list", () => {
  const params: IParams = { apiRequestId: "123" };
  const strapName = "property";

  const articleWithId = (id: number) => ({ id: `${id}` } as IRawArticle);
  const expectBasicArticleWithId = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleUnit,
      id: `${id}`
    });
  const expectBasicArticleTitleWithId = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleTitleUnit,
      id: `${id}`
    });

  it("should call getRawArticles with total number of articles for all pages", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Business,
      strapName,
      basicArticlesPerPage: 2,
      basicTitleArticlesPerPage: 3,
      pages: 2
    };
    (getRawArticles as jest.Mock).mockResolvedValue([]);

    await expandableArticleList(handlerRunner, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.Business, 10, params);
  });

  it("should return articles as basic articles and title articles specified for a single page", async () => {
    const handlerRunner = jest.fn();
    const handlerInput: IExpandableArticleListHandlerInput = {
      type: HandlerInputType.ExpandableArticleList,
      sourceId: Strap.Business,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 1,
      pages: 1
    };

    const expectedContentBlocks = [
      expectBasicArticleWithId(1),
      expectBasicArticleTitleWithId(2)
    ];
    const rawArticles = [articleWithId(1), articleWithId(2)];
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
      sourceId: Strap.Business,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 2,
      pages: 2
    };

    const expectedContentBlocks = [
      expectBasicArticleWithId(1),
      expectBasicArticleTitleWithId(2),
      expectBasicArticleTitleWithId(2),
      expectBasicArticleWithId(1),
      expectBasicArticleTitleWithId(2),
      expectBasicArticleTitleWithId(2)
    ];
    const rawArticles = [
      articleWithId(1),
      articleWithId(2),
      articleWithId(2),
      articleWithId(1),
      articleWithId(2),
      articleWithId(2)
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
      sourceId: Strap.Business,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 2,
      pages: 2
    };

    const expectedContentBlocks = [
      expectBasicArticleWithId(1),
      expectBasicArticleTitleWithId(2),
      expectBasicArticleTitleWithId(2),
      expectBasicArticleWithId(1)
    ];
    const rawArticles = [
      articleWithId(1),
      articleWithId(2),
      articleWithId(2),
      articleWithId(1)
    ];
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
      sourceId: Strap.Business,
      strapName,
      basicArticlesPerPage: 1,
      basicTitleArticlesPerPage: 2,
      pages: 2
    };

    const expectedContentBlocks = [expectBasicArticleWithId(1)];
    const rawArticles = [articleWithId(1)];
    (getRawArticles as jest.Mock).mockResolvedValue(rawArticles);

    const contentBlocks = await expandableArticleList(
      handlerRunner,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual(expectedContentBlocks);
  });
});
