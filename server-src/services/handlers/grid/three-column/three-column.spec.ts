import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IThreeColumnHandlerInput } from "../../__types__/IThreeColumnHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import threeColumnHandler from "./three-column";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Three column", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const strapName = "testStrap"
  const displayName = "test";
  const displayNameColor = "testColor";

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
    headlineFlags: []
  };

  const moduleTitle: IModuleTitle = {
    type: ContentBlockType.ModuleTitle,
    displayName,
    displayNameColor
  };

  const articleAsTitleUnit: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 2",
    title: "Title Two",
    linkUrl: "/link2",
    lastPublishedTime: 2,
    headlineFlags: []
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve 3 list of articles", async() => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(8).fill(article)
    );
    const input: IThreeColumnHandlerInput = {
      type: HandlerInputType.ThreeColumn
    };

    await threeColumnHandler(handlerRunnerMock, input, params);
    expect(getRawArticles).toHaveBeenCalledTimes(3);
  });
});
