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

  const fakeArticlesWithIds = (ids: number[]) =>
    ids.map((id) => ({ id: `${id}` } as IRawArticle));

  const expectBasicArticleTitle = (id: number) =>
    expect.objectContaining({
      type: ContentBlockType.BasicArticleTitleUnit,
      id: `${id}`
    });

  it("should pass articles as title units to list grid", async () => {
    const articleRetriever = Promise.resolve(fakeArticlesWithIds([1, 2, 3]));
    const handlerRunner = jest.fn();
    handlerRunner.mockResolvedValue([]);

    await createRelevantStoriesColumn(
      articleRetriever,
      moduleTitle,
      moduleTitleColor,
      handlerRunner,
      params
    );

    const expectedListGridInput: IListGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        expectBasicArticleTitle(1),
        expectBasicArticleTitle(2),
        expectBasicArticleTitle(3)
      ]
    };
    expect(handlerRunner).toHaveBeenNthCalledWith(
      1,
      expectedListGridInput,
      params
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
      handlerRunner,
      params
    );

    expect(result).toEqual([]);
  });
});
