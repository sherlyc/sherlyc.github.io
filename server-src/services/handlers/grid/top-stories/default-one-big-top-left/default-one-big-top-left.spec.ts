import topStoriesDefaultOne from "./default-one-big-top-left";
import { IRawArticle } from "../../../../adapters/__types__/IRawArticle";
import { IParams } from "../../../../__types__/IParams";
import { ITopStoriesDefaultOneHandlerInput } from "../../../__types__/ITopStoriesDefaultOneHandlerInput";
import { HandlerInputType } from "../../../__types__/HandlerInputType";
import { IColumnGridHandlerInput } from "../../../__types__/IColumnGridHandlerInput";
import {
  BigImageArticleUnitLayout,
  IBigImageArticleUnit
} from "../../../../../../common/__types__/IBigImageArticleUnit";
import { ContentBlockType } from "../../../../../../common/__types__/ContentBlockType";
import { IFeaturedArticle } from "../../../../../../common/__types__/IFeaturedArticle";

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
    boxColor: "black",
    textColor: "white",
    applyGradient: false
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should layout content blocks using column grid handler", async () => {
    const handlerInput: ITopStoriesDefaultOneHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOneBigTopLeft,
      articles: [article, article],
      strapName
    };

    await topStoriesDefaultOne(handlerRunnerMock, handlerInput, params);

    const columnGridExpectedInput: IColumnGridHandlerInput = {
      type: HandlerInputType.ColumnGrid,
      content: [[articleAsBigImage], [articleAsFeaturedArticle]]
    };
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      columnGridExpectedInput,
      params
    );
  });
});
