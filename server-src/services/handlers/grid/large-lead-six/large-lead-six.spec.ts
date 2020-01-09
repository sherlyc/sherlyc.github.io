import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import largeLeadSixHandler from "../large-lead-six/large-lead-six";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import {
  ILargeLeadSixGridHandlerInput,
  LargeLeadSixGridPositions
} from "../../__types__/ILargeLeadSixGridHandlerInput";
import { IBigImageArticleUnit } from "../../../../../common/__types__/IBigImageArticleUnit";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBasicAdUnit } from "../../../../../common/__types__/IBasicAdUnit";
import { ILargeLeadSixHandlerInput } from "../../__types__/ILargeLeadSixHandlerInput";
import {
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IBasicArticleTitleUnit } from "../../../../../common/__types__/IBasicArticleTitleUnit";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Large lead six", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const sourceId = Strap.NowToLove;
  const strapName = "fakeStrapName";
  const displayName = "displayName";
  const displayNameColor = "displayNameColor";

  const articleOne: IRawArticle = {
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
  const articleTwo: IRawArticle = {
    id: "2",
    indexHeadline: "Headline 2",
    title: "Title Two",
    introText: "Intro 2",
    linkUrl: "/link2",
    defconSrc: null,
    imageSrc: "2.jpg",
    imageSrcSet: "2.jpg 2w",
    strapImageSrc: "strap2.jpg",
    strapImageSrcSet: "strap2.jpg 2w",
    lastPublishedTime: 2,
    headlineFlags: []
  };
  const moduleTitle: IModuleTitle = {
    type: ContentBlockType.ModuleTitle,
    displayName,
    displayNameColor
  };
  const articleOneAsBigImage: IBigImageArticleUnit = {
    type: ContentBlockType.BigImageArticleUnit,
    id: "1",
    strapName,
    indexHeadline: "Headline 1",
    title: "Title One",
    introText: "Intro 1",
    linkUrl: "/link1",
    imageSrc: "strap1.jpg",
    imageSrcSet: "strap1.jpg 1w",
    lastPublishedTime: 1,
    headlineFlags: []
  };
  const articleTwoAsTitle: IBasicArticleTitleUnit = {
    type: ContentBlockType.BasicArticleTitleUnit,
    id: "2",
    strapName,
    indexHeadline: "Headline 2",
    title: "Title Two",
    linkUrl: "/link2",
    lastPublishedTime: 2,
    headlineFlags: []
  };
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: strapName
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should retrieve articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue(
      new Array(6).fill(articleOne)
    );
    const input: ILargeLeadSixHandlerInput = {
      type: HandlerInputType.LargeLeadSix,
      displayName,
      displayNameColor,
      strapName,
      sourceId
    };

    await largeLeadSixHandler(handlerRunnerMock, input, params);

    expect(getRawArticles).toHaveBeenCalledWith(sourceId, 6, params);
  });

  it("should create content blocks and pass them to large lead six grid", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([
      articleOne,
      articleTwo,
      articleTwo,
      articleTwo,
      articleTwo,
      articleTwo
    ]);
    const listGridResult: IGridContainer = {
      type: ContentBlockType.GridContainer,
      items: {},
      mobile: {} as IGridConfig,
      tablet: {} as IGridConfig,
      desktop: {} as IGridConfig
    };
    handlerRunnerMock.mockResolvedValueOnce([listGridResult]);

    const input: ILargeLeadSixHandlerInput = {
      type: HandlerInputType.LargeLeadSix,
      displayName,
      displayNameColor,
      strapName,
      sourceId
    };
    await largeLeadSixHandler(handlerRunnerMock, input, params);

    const listGridHandlerInput = {
      type: HandlerInputType.ListGrid,
      content: [
        articleTwoAsTitle,
        articleTwoAsTitle,
        articleTwoAsTitle,
        articleTwoAsTitle,
        articleTwoAsTitle
      ]
    };

    const largeLeadSixGridHandlerInput: ILargeLeadSixGridHandlerInput = {
      type: HandlerInputType.LargeLeadSixGrid,
      content: {
        [LargeLeadSixGridPositions.ModuleTitle]: [moduleTitle],
        [LargeLeadSixGridPositions.Left]: [articleOneAsBigImage],
        [LargeLeadSixGridPositions.Middle]: [listGridResult],
        [LargeLeadSixGridPositions.Right]: [basicAdUnit]
      }
    };
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      listGridHandlerInput,
      params
    );
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      largeLeadSixGridHandlerInput,
      params
    );
  });

  it("should log and throw error for insufficient articles", async () => {
    (getRawArticles as jest.Mock).mockResolvedValue([articleOne]);
    const input: ILargeLeadSixHandlerInput = {
      type: HandlerInputType.LargeLeadSix,
      displayName,
      displayNameColor,
      strapName,
      sourceId
    };

    expect.assertions(1);
    try {
      await largeLeadSixHandler(handlerRunnerMock, input, params);
    } catch (error) {
      expect(error.message).toContain(
        `Large Lead Six handler error: Insufficient number of articles: 1. Strap name: ${sourceId}|${strapName}`
      );
    }
  });
});
