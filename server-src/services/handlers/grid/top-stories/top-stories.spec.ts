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

jest.mock("../../../adapters/article-retriever/article-retriever");
jest.mock("../../../adapters/layout/layout-retriever");

describe("Top Stories", () => {
  beforeEach(() => {
    jest.resetAllMocks();
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
    sixteenByNineSrc: null
  };

  it("should retrieve articles and layout", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(11).fill(article)
    );
    (layoutRetriever as jest.Mock).mockResolvedValue(LayoutType.DEFAULT);
    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      strapName
    };

    await topStoriesHandler(handlerRunnerMock, handlerInput, params);

    expect(getRawArticles).toHaveBeenCalledWith(Strap.TopStories, 11, params);
    expect(layoutRetriever).toHaveBeenCalledWith(params);
  });

  it("should call top stories default one when layout is default", async () => {
    const articles = new Array(11).fill(article);
    (getRawArticles as jest.Mock).mockResolvedValue(articles);
    (layoutRetriever as jest.Mock).mockResolvedValue(LayoutType.DEFAULT);

    const handlerInput: ITopStoriesHandlerInput = {
      type: HandlerInputType.TopStories,
      strapName
    };

    await topStoriesHandler(handlerRunnerMock, handlerInput, params);

    const topStoriesDefaultOneHandlerInput: ITopStoriesDefaultOneHandlerInput = {
      type: HandlerInputType.TopStoriesDefaultOne,
      strapName,
      articles: articles.slice(0, 2)
    };
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      topStoriesDefaultOneHandlerInput,
      params
    );
  });
});
