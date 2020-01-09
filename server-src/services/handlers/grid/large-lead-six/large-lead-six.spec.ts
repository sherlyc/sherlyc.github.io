import { IParams } from "../../../__types__/IParams";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { Strap } from "../../../strap";
import { ISixImageHandlerInput } from "../../__types__/ISixImageHandlerInput";
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

jest.mock("../../../adapters/article-retriever/article-retriever");

describe("Large lead six", () => {
  const handlerRunnerMock = jest.fn();
  const params: IParams = { apiRequestId: "123" };
  const sourceId = Strap.NowToLove;
  const strapName = "fakeStrapName";
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
      displayName: "FakeName",
      displayNameColor: "FakeColor",
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
      displayName: "FakeName",
      displayNameColor: "FakeColor",
      strapName,
      sourceId
    };

    const expected: ILargeLeadSixGridHandlerInput = {
      type: HandlerInputType.LargeLeadSixGrid,
      content: {
        [LargeLeadSixGridPositions.Left]: [articleOneAsBigImage],
        [LargeLeadSixGridPositions.Middle]: [listGridResult],
        [LargeLeadSixGridPositions.Right]: [basicAdUnit]
      }
    };

    await largeLeadSixHandler(handlerRunnerMock, input, params);

    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ListGrid,
        content: [
          articleTwoAsTitle,
          articleTwoAsTitle,
          articleTwoAsTitle,
          articleTwoAsTitle,
          articleTwoAsTitle
        ]
      },
      params
    );
    // expect(handlerRunnerMock).toHaveBeenCalledWith(expected);
  });
});
