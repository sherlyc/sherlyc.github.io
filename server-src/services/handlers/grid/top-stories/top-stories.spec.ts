import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import topStoriesHandler from "./top-stories";
import { IParams } from "../../../__types__/IParams";
import { ITopStoriesHandlerInput } from "../../__types__/ITopStoriesHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { Strap } from "../../../strap";
import { layoutRetriever } from "../../../adapters/layout/layout-retriever";
import { LayoutType } from "../../../adapters/__types__/LayoutType";
import { ITopStoriesDefaultOneHandlerInput } from "../../__types__/ITopStoriesDefaultOneHandlerInput";
import {
  ITopStoriesGridHandlerInput,
  TopStoriesGridPositions
} from "../../__types__/ITopStoriesGridHandlerInput";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IGridContainer } from "../../../../../common/__types__/IGridContainer";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  IBigImageArticleUnit,
  BigImageArticleUnitLayout
} from "../../../../../common/__types__/IBigImageArticleUnit";

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

describe("Top Stories", () => {
  beforeEach(() => {
    jest.resetAllMocks();

    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(11).fill(article)
    );
  });

  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "Top Stories";
  const article: IRawArticle = {
    id: "1",
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    defconSrc: null,
    imageSrc: "1.jpg",
    imageSrcSet: "1.jpg 1w",
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    sixteenByNineSrc: "sixteenByNineSrc.jpg"
  };
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };
  const articleAsBigImage: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "sixteenByNineSrc.jpg",
    imageSrcSet: "strap1.jpg 1w",
    layout: BigImageArticleUnitLayout.module,
    lastPublishedTime: 1,
    headlineFlags: []
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
      const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHandlerInput = {
        type: HandlerInputType.TopStoriesDefaultOne,
        strapName,
        articles: [article, article]
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
          [TopStoriesGridPositions.BigTopLeft]: [
            topStoriesDefaultOneResult as IContentBlock
          ],
          [TopStoriesGridPositions.Right]: [basicAdUnit],
          [TopStoriesGridPositions.FirstRow1]: [articleAsBigImage],
          [TopStoriesGridPositions.FirstRow2]: [articleAsBigImage],
          [TopStoriesGridPositions.FirstRow3]: [articleAsBigImage],
          [TopStoriesGridPositions.FirstRow4]: [articleAsBigImage],
          [TopStoriesGridPositions.SecondRow1]: [articleAsBigImage],
          [TopStoriesGridPositions.SecondRow2]: [articleAsBigImage],
          [TopStoriesGridPositions.SecondRow3]: [articleAsBigImage],
          [TopStoriesGridPositions.SecondRow4]: [articleAsBigImage]
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
