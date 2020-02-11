import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import topStoriesHandler from "./top-stories";
import { IParams } from "../../../__types__/IParams";
import { ITopStoriesHandlerInput } from "../../__types__/ITopStoriesHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { layoutRetriever } from "../../../adapters/layout/layout-retriever";
import { LayoutType } from "../../../adapters/__types__/LayoutType";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "../../__types__/ITopStoriesDefaultOneHighlightHandlerInput";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

const fakeArticlesWithIds = (ids: number[]) =>
  ids.map((id) => ({ id: `${id}` } as IRawArticle));

const expectHalfWidthImage = (id: string) =>
  expect.objectContaining({
    type: ContentBlockType.HalfWidthImageArticleUnit,
    id
  });

const expectHalfWidthImageWithoutIntro = (id: string) =>
  expect.objectContaining({
    type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
    id
  });

describe("Top Stories", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      fakeArticlesWithIds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    );
  });

  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "Top Stories";
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };
  const topStoriesHandlerInput: ITopStoriesHandlerInput = {
    type: HandlerInputType.TopStories,
    strapName
  };

  describe("when layout is Default One", () => {
    beforeEach(() => {
      (layoutRetriever as jest.Mock).mockResolvedValue(LayoutType.DEFAULT);
    });

    it("should retrieve articles and layout", async () => {
      await topStoriesHandler(
        handlerRunnerMock,
        topStoriesHandlerInput,
        params
      );

      expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 11, params);
      expect(layoutRetriever).toHaveBeenCalledWith(params);
    });

    it("should call top stories default one", async () => {
      await topStoriesHandler(
        handlerRunnerMock,
        topStoriesHandlerInput,
        params
      );

      const [[topStoriesDefaultOneCall]] = handlerRunnerMock.mock.calls;
      const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHighlightHandlerInput = {
        type: HandlerInputType.TopStoriesDefaultOneHighlight,
        strapName,
        articles: fakeArticlesWithIds([2, 1])
      };
      expect(topStoriesDefaultOneCall).toEqual(
        topStoriesDefaultOneHandlerInput
      );
    });

    it("should call top stories grid", async () => {
      const topStoriesDefaultOneResult = {
        type: ContentBlockType.GridContainer
      };
      handlerRunnerMock.mockResolvedValueOnce([
        topStoriesDefaultOneResult as IGridContainer
      ]);

      await topStoriesHandler(
        handlerRunnerMock,
        topStoriesHandlerInput,
        params
      );

      const topStoriesGridHandlerInput: ITopStoriesGridHandlerInput = {
        type: HandlerInputType.TopStoriesGrid,
        content: {
          [TopStoriesGridPositions.Highlight]: [
            topStoriesDefaultOneResult as IContentBlock
          ],
          [TopStoriesGridPositions.Right]: [basicAdUnit],
          [TopStoriesGridPositions.FirstRow1]: [expectHalfWidthImage("3")],
          [TopStoriesGridPositions.FirstRow2]: [expectHalfWidthImage("4")],
          [TopStoriesGridPositions.FirstRow3]: [basicAdUnit],
          [TopStoriesGridPositions.FirstRow4]: [expectHalfWidthImage("5")],
          [TopStoriesGridPositions.SecondRow1]: [
            expectHalfWidthImageWithoutIntro("6")
          ],
          [TopStoriesGridPositions.SecondRow2]: [
            expectHalfWidthImageWithoutIntro("7")
          ],
          [TopStoriesGridPositions.SecondRow3]: [
            expectHalfWidthImageWithoutIntro("8")
          ],
          [TopStoriesGridPositions.SecondRow4]: [
            expectHalfWidthImageWithoutIntro("9")
          ]
        }
      };
      expect(handlerRunnerMock).toHaveBeenNthCalledWith(
        2,
        topStoriesGridHandlerInput,
        params
      );
    });
  });
});
