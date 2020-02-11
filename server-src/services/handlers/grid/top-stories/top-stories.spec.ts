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
import { flow, range, map } from "lodash/fp";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

const fakeArticleWithId = (id: number | string) =>
  (({ id: `${id}` } as any) as IRawArticle);

const fakeArticlesWithIdRange = flow(range, map(fakeArticleWithId));

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
      fakeArticlesWithIdRange(1, 12)
    );
  });

  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "Top Stories";
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  describe("when layout is Default One", () => {
    beforeEach(() => {
      (layoutRetriever as jest.Mock).mockResolvedValue(LayoutType.DEFAULT);
    });

    it("should retrieve articles and layout", async () => {
      const handlerInput: ITopStoriesHandlerInput = {
        type: HandlerInputType.TopStories,
        strapName
      };

      await topStoriesHandler(handlerRunnerMock, handlerInput, params);

      expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 11, params);
      expect(layoutRetriever).toHaveBeenCalledWith(params);
    });

    it("should call top stories default one", async () => {
      const handlerInput: ITopStoriesHandlerInput = {
        type: HandlerInputType.TopStories,
        strapName
      };

      await topStoriesHandler(handlerRunnerMock, handlerInput, params);

      const [[topStoriesDefaultOneCall]] = handlerRunnerMock.mock.calls;
      const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHighlightHandlerInput = {
        type: HandlerInputType.TopStoriesDefaultOneHighlight,
        strapName,
        articles: fakeArticlesWithIdRange(2, 0)
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

      const handlerInput: ITopStoriesHandlerInput = {
        type: HandlerInputType.TopStories,
        strapName
      };

      await topStoriesHandler(handlerRunnerMock, handlerInput, params);

      const topStoriesGridHandlerInput: ITopStoriesGridHandlerInput = {
        type: HandlerInputType.TopStoriesGrid,
        content: {
          [TopStoriesGridPositions.Highlight]: [
            topStoriesDefaultOneResult as IContentBlock
          ],
          [TopStoriesGridPositions.Right]: [basicAdUnit],
          [TopStoriesGridPositions.FirstRow1]: [expectHalfWidthImage("3")],
          [TopStoriesGridPositions.FirstRow2]: [expectHalfWidthImage("4")],
          [TopStoriesGridPositions.FirstRow3]: [expectHalfWidthImage("5")],
          [TopStoriesGridPositions.FirstRow4]: [expectHalfWidthImage("6")],
          [TopStoriesGridPositions.SecondRow1]: [
            expectHalfWidthImageWithoutIntro("7")
          ],
          [TopStoriesGridPositions.SecondRow2]: [
            expectHalfWidthImageWithoutIntro("8")
          ],
          [TopStoriesGridPositions.SecondRow3]: [
            expectHalfWidthImageWithoutIntro("9")
          ],
          [TopStoriesGridPositions.SecondRow4]: [
            expectHalfWidthImageWithoutIntro("10")
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
