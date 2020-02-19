import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import relevantStoriesHandler from "./relevant-stories";
import { Strap } from "../../../strap";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { RelevantStoriesGridPositions } from "../../__types__/IRelevantStoriesGridHandlerInput";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/most-popular/most-popular.service");

describe("Relevant Stories", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectBasicArticleTitle = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleTitleUnit,
      id: `${id}`
    });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 3 list of articles", async () => {
    const articlesPerList = 5;
    handlerRunnerMock.mockResolvedValue([]);
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (getMostPopular as jest.Mock).mockResolvedValue([]);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(2);
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.LatestNews,
      articlesPerList,
      params
    );
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.EditorPicks,
      articlesPerList,
      params
    );
    expect(getMostPopular).toHaveBeenCalledWith(articlesPerList, params);
  });

  it("should create column one content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5])
    );
    (getMostPopular as jest.Mock).mockResolvedValue([]);
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [
      [firstListGridCall],
      [second],
      [third],
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectBasicArticleTitle(1),
        expectBasicArticleTitle(2),
        expectBasicArticleTitle(3),
        expectBasicArticleTitle(4),
        expectBasicArticleTitle(5)
      ]
    };
    expect(firstListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Latest News",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[0]).toEqual([title, fakeListGrid]);
  });

  it("should create column two content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([5, 6, 7, 8, 9])
    );
    (getMostPopular as jest.Mock).mockResolvedValue([]);
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [
      [listGridCall],
      [secondListGridCall],
      [third],
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectBasicArticleTitle(5),
        expectBasicArticleTitle(6),
        expectBasicArticleTitle(7),
        expectBasicArticleTitle(8),
        expectBasicArticleTitle(9)
      ]
    };
    expect(secondListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Editors' Picks",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[1]).toEqual([title, fakeListGrid]);
  });

  it("should create column three content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (getMostPopular as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([9, 10, 11, 12, 13])
    );
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };

    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [
      [first],
      [second],
      [thirdListGridCall],
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectBasicArticleTitle(9),
        expectBasicArticleTitle(10),
        expectBasicArticleTitle(11),
        expectBasicArticleTitle(12),
        expectBasicArticleTitle(13)
      ]
    };
    expect(thirdListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Most Popular",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[2]).toEqual([title, fakeListGrid]);
  });

  it("should create ad unit and place it on the right for relevant stories grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (getMostPopular as jest.Mock).mockResolvedValue([]);
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };

    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [
      [first],
      [second],
      [third],
      [fourth],
      [relevantStoriesGrid]
    ] = handlerRunnerMock.mock.calls;

    const adUnit: IBasicAdUnit = {
      type: ContentBlockType.BasicAdUnit,
      context: "homepageEditorsPicks"
    };

    expect(
      relevantStoriesGrid.content[RelevantStoriesGridPositions.Right]
    ).toEqual([
      {
        type: ContentBlockType.StickyContainer,
        items: [adUnit]
      }
    ]);
  });

  describe("when failing to retrieve articles", () => {
    it("should create empty content blocks for column one and pass it to column grid", async () => {
      (getRawArticles as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to retrieve column one articles")
      );
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        fakeArticlesWithIds([1, 2, 3, 4, 5])
      );
      (getMostPopular as jest.Mock).mockResolvedValueOnce(
        fakeArticlesWithIds([1, 2, 3, 4, 5])
      );
      handlerRunnerMock.mockResolvedValue({
        type: ContentBlockType.GridContainer
      });

      const input: IRelevantStoriesHandlerInput = {
        type: HandlerInputType.RelevantStories
      };

      await relevantStoriesHandler(handlerRunnerMock, input, params);

      const [
        [secondColumn],
        [thirdColumn],
        [columnGridCall]
      ] = handlerRunnerMock.mock.calls;

      expect(columnGridCall.content[0]).toEqual([]);
    });

    it("should create empty content blocks for column two and pass it to column grid", async () => {
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        fakeArticlesWithIds([1, 2, 3, 4, 5])
      );
      (getRawArticles as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to retrieve column two articles")
      );
      (getMostPopular as jest.Mock).mockResolvedValueOnce(
        fakeArticlesWithIds([1, 2, 3, 4, 5])
      );
      handlerRunnerMock.mockResolvedValue({
        type: ContentBlockType.GridContainer
      });

      const input: IRelevantStoriesHandlerInput = {
        type: HandlerInputType.RelevantStories
      };

      await relevantStoriesHandler(handlerRunnerMock, input, params);

      const [
        [firstColumn],
        [thirdColumn],
        [columnGridCall]
      ] = handlerRunnerMock.mock.calls;

      expect(columnGridCall.content[1]).toEqual([]);
    });

    it("should create empty content blocks for column three and pass it to column grid", async () => {
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        fakeArticlesWithIds([1, 2, 3, 4, 5])
      );
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        fakeArticlesWithIds([1, 2, 3, 4, 5])
      );
      (getMostPopular as jest.Mock).mockRejectedValue(
        new Error("Failed to retrieve column three articles")
      );
      handlerRunnerMock.mockResolvedValue({
        type: ContentBlockType.GridContainer
      });

      const input: IRelevantStoriesHandlerInput = {
        type: HandlerInputType.RelevantStories
      };

      await relevantStoriesHandler(handlerRunnerMock, input, params);

      const [
        [firstColumn],
        [secondColumn],
        [columnGridCall]
      ] = handlerRunnerMock.mock.calls;

      expect(columnGridCall.content[2]).toEqual([]);
    });
  });
});
