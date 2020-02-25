import { HandlerInputType } from "../../__types__/HandlerInputType";
import { createRelevantStoriesColumn } from "./relevant-stories-column";
import { IParams } from "../../../__types__/IParams";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  IStripsGridHandlerInput,
  StripsGridPositions
} from "../../__types__/IStripsGridHandlerInput";
import { IListGridHandlerInput } from "../../__types__/IListGridHandlerInput";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/most-popular/most-popular.service");

describe("Relevant stories column", () => {
  const params: IParams = { apiRequestId: "123" };
  const moduleTitle = "moduleTitle";
  const moduleTitleColor = "red";
  const notShowTimestamp = false;
  const notShowNumberPosition = false;
  const showNumberPosition = true;
  const showTimeStamp = true;

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectArticleTitleWithTimestamp = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.ArticleTitle,
      id: `${id}`,
      showTimestamp: true,
      position: undefined
    });

  const expectArticleTitleWithPosition = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.ArticleTitle,
      id: `${id}`,
      position: `0${id}`,
      showTimestamp: false
    });

  it("should pass article title with timestamp to list grid", async () => {
    const articleRetriever = Promise.resolve(fakeArticlesWithIds([1, 2, 3]));
    const handlerRunner = jest.fn();
    handlerRunner.mockResolvedValue([]);

    await createRelevantStoriesColumn(
      articleRetriever,
      moduleTitle,
      moduleTitleColor,
      showTimeStamp,
      notShowNumberPosition,
      handlerRunner,
      params
    );

    const expectedListGridInput: IListGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectArticleTitleWithTimestamp(1),
        expectArticleTitleWithTimestamp(2),
        expectArticleTitleWithTimestamp(3)
      ]
    };
    expect(handlerRunner).toHaveBeenNthCalledWith(
      1,
      expectedListGridInput,
      params
    );
  });

  it("should pass articles title with position to list grid", async () => {
    const articleRetriever = Promise.resolve(fakeArticlesWithIds([1, 2, 3]));
    const handlerRunner = jest.fn();
    handlerRunner.mockResolvedValue([]);

    await createRelevantStoriesColumn(
      articleRetriever,
      moduleTitle,
      moduleTitleColor,
      notShowTimestamp,
      showNumberPosition,
      handlerRunner,
      params
    );

    const expectedListGridInput: IListGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectArticleTitleWithPosition(1),
        expectArticleTitleWithPosition(2),
        expectArticleTitleWithPosition(3)
      ]
    };
    expect(handlerRunner).toHaveBeenNthCalledWith(
      1,
      expectedListGridInput,
      params
    );
  });

  it("should not pad for two digit position", async () => {
    const articleRetriever = Promise.resolve(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    );
    const handlerRunner = jest.fn();
    handlerRunner.mockResolvedValue([]);

    await createRelevantStoriesColumn(
      articleRetriever,
      moduleTitle,
      moduleTitleColor,
      notShowTimestamp,
      showNumberPosition,
      handlerRunner,
      params
    );

    const [[listGridInput]] = handlerRunner.mock.calls;

    expect(listGridInput.content[9]).toEqual(
      expect.objectContaining({
        type: ContentBlockType.ArticleTitle,
        id: "10",
        position: "10",
        showTimestamp: false
      })
    );
  });

  it("should pass subtitle as module title and list grid as content to strips grid", async () => {
    const articleRetriever = Promise.resolve(fakeArticlesWithIds([1, 2, 3]));
    const handlerRunner = jest.fn();
    const fakeListGrid = {
      type: ContentBlockType.GridContainer
    } as IContentBlock;
    handlerRunner.mockResolvedValue(fakeListGrid);

    await createRelevantStoriesColumn(
      articleRetriever,
      moduleTitle,
      moduleTitleColor,
      showTimeStamp,
      showNumberPosition,
      handlerRunner,
      params
    );

    const expectedStripGridInput: IStripsGridHandlerInput = {
      type: HandlerInputType.StripsGrid,
      content: {
        [StripsGridPositions.ModuleTitle]: [
          {
            type: ContentBlockType.ModuleSubtitle,
            displayName: moduleTitle,
            displayNameColor: moduleTitleColor
          }
        ],
        [StripsGridPositions.ModuleContent]: [fakeListGrid]
      }
    };
    expect(handlerRunner).toHaveBeenNthCalledWith(
      2,
      expectedStripGridInput,
      params
    );
  });

  it("should return empty content when failing to retrieve articles", async () => {
    const articleRetriever = Promise.reject(new Error());
    const handlerRunner = jest.fn();
    handlerRunner.mockResolvedValue({});

    const result = await createRelevantStoriesColumn(
      articleRetriever,
      moduleTitle,
      moduleTitleColor,
      showTimeStamp,
      showNumberPosition,
      handlerRunner,
      params
    );

    expect(result).toEqual([]);
  });
});
