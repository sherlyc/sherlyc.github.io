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
import { BigImageArticleUnitLayout } from "../../../../../common/__types__/IBigImageArticleUnit";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

const fakeArticle = (id: string) => ({
  id,
  indexHeadline: `Headline ${id}`,
  title: `Title ${id}`,
  introText: `Intro ${id}`,
  linkUrl: `/link${id}`,
  defconSrc: null,
  imageSrc: `${id}.jpg`,
  imageSrcSet: `${id}.jpg ${id}w`,
  strapImageSrc: `strap${id}.jpg`,
  strapImageSrcSet: `strap${id}.jpg ${id}w`,
  lastPublishedTime: 1,
  headlineFlags: [],
  sixteenByNineSrc: `sixteenByNineSrc-${id}.jpg`
});

const fakeBigImageArticle = (id: string): IContentBlock => ({
  type: ContentBlockType.BigImageArticleUnit,
  id,
  strapName: "Top Stories",
  indexHeadline: `Headline ${id}`,
  title: `Title ${id}`,
  introText: `Intro ${id}`,
  linkUrl: `/link${id}`,
  imageSrc: `sixteenByNineSrc-${id}.jpg`,
  imageSrcSet: `strap${id}.jpg ${id}w`,
  layout: BigImageArticleUnitLayout.module,
  lastPublishedTime: 1,
  headlineFlags: []
});

describe("Top Stories", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue([
      fakeArticle("1"),
      fakeArticle("2"),
      fakeArticle("3"),
      fakeArticle("4"),
      fakeArticle("5"),
      fakeArticle("6"),
      fakeArticle("7"),
      fakeArticle("8"),
      fakeArticle("9"),
      fakeArticle("10"),
      fakeArticle("11")
    ]);
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
        articles: [fakeArticle("2"), fakeArticle("1")]
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
          [TopStoriesGridPositions.FirstRow1]: [
            expect.objectContaining({
              type: ContentBlockType.HalfWidthImageArticleUnit,
              id: "3"
            })
          ],
          [TopStoriesGridPositions.FirstRow2]: [
            expect.objectContaining({
              type: ContentBlockType.HalfWidthImageArticleUnit,
              id: "4"
            })
          ],
          [TopStoriesGridPositions.FirstRow3]: [
            expect.objectContaining({
              type: ContentBlockType.HalfWidthImageArticleUnit,
              id: "5"
            })
          ],
          [TopStoriesGridPositions.FirstRow4]: [
            expect.objectContaining({
              type: ContentBlockType.HalfWidthImageArticleUnit,
              id: "6"
            })
          ],
          [TopStoriesGridPositions.SecondRow1]: [
            expect.objectContaining({
              type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
              id: "7"
            })
          ],
          [TopStoriesGridPositions.SecondRow2]: [
            expect.objectContaining({
              type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
              id: "8"
            })
          ],
          [TopStoriesGridPositions.SecondRow3]: [
            expect.objectContaining({
              type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
              id: "9"
            })
          ],
          [TopStoriesGridPositions.SecondRow4]: [
            expect.objectContaining({
              type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
              id: "10"
            })
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
