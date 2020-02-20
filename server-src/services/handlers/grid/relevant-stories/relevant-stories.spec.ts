import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { basicAdUnit } from "../../../adapters/article-converter/basic-ad-unit.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { getMostPopular } from "../../../adapters/most-popular/most-popular.service";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { RelevantStoriesGridPositions } from "../../__types__/IRelevantStoriesGridHandlerInput";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import relevantStoriesHandler from "./relevant-stories";

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

  it("should create list grid with column one content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValueOnce(
      fakeArticlesWithIds([1, 2, 3, 4, 5])
    );
    (getRawArticles as jest.Mock).mockResolvedValueOnce(
      fakeArticlesWithIds([6, 7, 8, 9, 10])
    );
    (getMostPopular as jest.Mock).mockResolvedValue([]);
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [[firstListGridCall]] = handlerRunnerMock.mock.calls;

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
  });

  it("should create list grid with column two content", async () => {
    (getRawArticles as jest.Mock).mockResolvedValueOnce(
      fakeArticlesWithIds([1, 2, 3, 4, 5])
    );
    (getRawArticles as jest.Mock).mockResolvedValueOnce(
      fakeArticlesWithIds([6, 7, 8, 9, 10])
    );
    (getMostPopular as jest.Mock).mockResolvedValue([]);
    const fakeListGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValue(fakeListGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [[first], [secondListGridCall]] = handlerRunnerMock.mock.calls;

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectBasicArticleTitle(6),
        expectBasicArticleTitle(7),
        expectBasicArticleTitle(8),
        expectBasicArticleTitle(9),
        expectBasicArticleTitle(10)
      ]
    };
    expect(secondListGridCall).toEqual(listGridHandlerInput);
  });

  it("should create list grid with most popular content", async () => {
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
      [thirdListGridCall]
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
  });

  it("should place correct content in each position for relevant stories grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([]);
    (getMostPopular as jest.Mock).mockResolvedValue([]);

    const fakeContent = (id: number) => [{ id: `${id}` }] as IContentBlock[];
    handlerRunnerMock.mockResolvedValueOnce(fakeContent(1));
    handlerRunnerMock.mockResolvedValueOnce(fakeContent(2));
    handlerRunnerMock.mockResolvedValueOnce(fakeContent(3));

    const fakeRelevantStoriesGrid = { type: ContentBlockType.GridContainer };
    handlerRunnerMock.mockResolvedValueOnce(fakeRelevantStoriesGrid);

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    const [
      [first],
      [second],
      [third],
      [relevantStoriesGridInput]
    ] = handlerRunnerMock.mock.calls;

    const expectFakeContent = (id: number) => [
      expect.objectContaining({ id: `${id}` })
    ];

    expect(relevantStoriesGridInput).toEqual({
      type: HandlerInputType.RelevantStoriesGrid,
      content: {
        [RelevantStoriesGridPositions.FirstColumnTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "latest news",
            displayNameColor: "pizzaz"
          }
        ],
        [RelevantStoriesGridPositions.FirstColumnContent]: expectFakeContent(1),
        [RelevantStoriesGridPositions.SecondColumnTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "editors' picks",
            displayNameColor: "pizzaz"
          }
        ],
        [RelevantStoriesGridPositions.SecondColumnContent]: expectFakeContent(
          2
        ),
        [RelevantStoriesGridPositions.ThirdColumnTitle]: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName: "most popular",
            displayNameColor: "pizzaz"
          }
        ],
        [RelevantStoriesGridPositions.ThirdColumnContent]: expectFakeContent(3),
        [RelevantStoriesGridPositions.Right]: [
          {
            type: ContentBlockType.StickyContainer,
            items: [basicAdUnit("homepageEditorsPicks")]
          }
        ]
      }
    });
  });

  describe("when failing to retrieve articles", () => {
    it("should create empty content blocks for column one content", async () => {
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
        [relevantStories]
      ] = handlerRunnerMock.mock.calls;

      expect(
        relevantStories.content[RelevantStoriesGridPositions.FirstColumnContent]
      ).toEqual([]);
    });

    it("should create empty content blocks for column two content", async () => {
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
        [relevantStories]
      ] = handlerRunnerMock.mock.calls;

      expect(
        relevantStories.content[
          RelevantStoriesGridPositions.SecondColumnContent
        ]
      ).toEqual([]);
    });

    it("should create empty content blocks for column three content", async () => {
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
        [relevantStories]
      ] = handlerRunnerMock.mock.calls;

      expect(
        relevantStories.content[RelevantStoriesGridPositions.ThirdColumnContent]
      ).toEqual([]);
    });
  });
});
