import { ContentBlockType } from "../../../../../../common/__types__/ContentBlockType";
import {
  BigImageArticleUnitLayout,
  IBigImageArticleUnit
} from "../../../../../../common/__types__/IBigImageArticleUnit";
import { IFeaturedArticle } from "../../../../../../common/__types__/IFeaturedArticle";
import { IParams } from "../../../../__types__/IParams";
import { IRawArticle } from "../../../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { IColumnGridHandlerInput } from "../../../__types__/IColumnGridHandlerInput";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "../../../__types__/ITopStoriesDefaultOneHighlightHandlerInput";
import defaultOneHighlightHandler from "./default-one-highlight";

describe("Top Stories Default One", () => {
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
    strapImageSrc: "strap1.jpg",
    strapImageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    sixteenByNineSrc: "sixteenByNineSrc.jpg"
  };
  const strapName = "strapName";
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
  const articleAsFeaturedArticle: IFeaturedArticle = {
    type: ContentBlockType.FeaturedArticle,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "sixteenByNineSrc.jpg",
    imageSrcSet: "1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: [],
    boxColor: "#333333",
    textColor: "white",
    applyGradient: false
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should layout content blocks using column grid handler", async () => {
    const handlerInput: ITopStoriesDefaultOneHighlightHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOneHighlight,
      articles: [article, article],
      strapName
    };

    await defaultOneHighlightHandler(handlerRunnerMock, handlerInput, params);

    const columnGridExpectedInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      columnGap: 20,
      border: false,
      content: [[articleAsBigImage], [articleAsFeaturedArticle]]
    };
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      columnGridExpectedInput,
      params
    );
  });
});
