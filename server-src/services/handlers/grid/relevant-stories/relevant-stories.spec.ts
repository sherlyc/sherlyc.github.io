import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRelevantStoriesHandlerInput } from "../../__types__/IRelevantStoriesHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import relevantStoriesHandler from "./relevant-stories";
import { Strap } from "../../../strap";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Relevant Stories", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };

  const article: IRawArticle = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    sixteenByNineSrc: "16by9.jpg",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };

  const articleAsTitleUnit = (strapName: string): IBasicArticleTitleUnit => ({
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    linkUrl: "/link1",
    lastPublishedTime: 1,
    headlineFlags: []
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 3 list of articles", async () => {
    const totalArticles = 8;
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(totalArticles).fill(article)
    );

    const input: IRelevantStoriesHandlerInput = {
      type: HandlerInputType.RelevantStories
    };

    handlerRunnerMock.mockResolvedValue([]);
    await relevantStoriesHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledTimes(3);
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.EditorPicks,
      totalArticles,
      params
    );
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Business,
      totalArticles,
      params
    );
    expect(getRawArticles).toHaveBeenCalledWith(
      Strap.Opinion,
      totalArticles,
      params
    );
  });

  it("should create column one content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
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
      content: new Array(8).fill(articleAsTitleUnit("Editors' Picks"))
    };
    expect(firstListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Editors' Picks",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[0]).toEqual([title, fakeListGrid]);
  });

  it("should create column two content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
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
      content: new Array(8).fill(articleAsTitleUnit("Business"))
    };
    expect(secondListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Business",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[1]).toEqual([title, fakeListGrid]);
  });

  it("should create column three content with module title and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
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
      content: new Array(8).fill(articleAsTitleUnit("Opinion"))
    };
    expect(thirdListGridCall).toEqual(listGridHandlerInput);

    const title: IModuleTitle = {
      type: ContentBlockType.ModuleTitle,
      displayName: "Opinion",
      displayNameColor: "pizzaz"
    };
    expect(columnGridCall.content[2]).toEqual([title, fakeListGrid]);
  });

  it("should create column four with ad unit and pass it to column grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(new Array(8).fill(article));
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
      [columnGridCall]
    ] = handlerRunnerMock.mock.calls;

    const adUnit: IBasicAdUnit = {
      type: ContentBlockType.BasicAdUnit,
      context: "homepageEditorsPicks"
    };

    expect(columnGridCall.content[3]).toEqual([adUnit]);
  });

  describe("when failing to retrieve articles", () => {
    it("should create empty content blocks for column one and pass it to column grid", async () => {
      (getRawArticles as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to retrieve column one articles")
      );
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        new Array(8).fill(article)
      );
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        new Array(8).fill(article)
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

      expect(handlerRunnerMock.mock.calls.length).toBe(3);
      expect(columnGridCall.content[0]).toEqual([]);
    });

    it("should create empty content blocks for column two and pass it to column grid", async () => {
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        new Array(8).fill(article)
      );
      (getRawArticles as jest.Mock).mockRejectedValueOnce(
        new Error("Failed to retrieve column two articles")
      );
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        new Array(8).fill(article)
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

      expect(handlerRunnerMock.mock.calls.length).toBe(3);
      expect(columnGridCall.content[1]).toEqual([]);
    });

    it("should create empty content blocks for column three and pass it to column grid", async () => {
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        new Array(8).fill(article)
      );
      (getRawArticles as jest.Mock).mockResolvedValueOnce(
        new Array(8).fill(article)
      );
      (getRawArticles as jest.Mock).mockRejectedValue(
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

      expect(handlerRunnerMock.mock.calls.length).toBe(3);
      expect(columnGridCall.content[2]).toEqual([]);
    });
  });
});
