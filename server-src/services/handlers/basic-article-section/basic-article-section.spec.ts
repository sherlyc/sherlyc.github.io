import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { Section } from "../../section";
import { Strap } from "../../strap";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IBasicArticleSectionHandlerInput } from "../__types__/IBasicArticleSectionHandlerInput";
import basicArticleSectionHandler from "./basic-article-section";

jest.mock("../runner");

describe("BasicArticleSectionHandler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  const basicAdUnit = {
    type: ContentBlockType.BasicAdUnit,
    context: "business"
  };
  const basicArticleUnit = {
    id: "1",
    strapName: "business",
    headlineFlags: [],
    imageSrc: "1.jpg",
    indexHeadline: "Headline 1",
    introText: "Intro 1",
    lastPublishedTime: 1,
    linkUrl: "/link1",
    type: "BasicArticleUnit"
  };
  const basicArticleTitleUnit = {
    id: "2",
    strapName: "business",
    headlineFlags: [],
    indexHeadline: "Headline 2",
    lastPublishedTime: 2,
    linkUrl: "/link2",
    type: "BasicArticleTitleUnit"
  };

  it("should get a section content block with only basic article units", async () => {
    const totalBasicArticlesUnit = 2;
    const handlerInput = {
      type: "ArticleSection",
      linkUrl: "/business",
      displayName: "business",
      displayNameColor: "red",
      content: {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        totalBasicArticlesUnit,
        strapName: "business"
      }
    } as IBasicArticleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    const basicArticleListItems = [
      basicAdUnit,
      basicArticleUnit,
      basicAdUnit,
      basicArticleUnit,
      basicAdUnit
    ];
    handlerRunnerMock.mockResolvedValue(basicArticleListItems);

    const contentBlocks = await basicArticleSectionHandler(
      handlerRunnerMock,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      {
        type: "BasicArticleSection",
        displayName: "business",
        displayNameColor: "red",
        linkUrl: "/business",
        items: basicArticleListItems
      },
      basicAdUnit
    ]);
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ArticleList,
        strapName: "business",
        sourceId: Section.Business,
        totalBasicArticlesUnit
      },
      params
    );
  });

  it("should get a section content block with basic article units and article title link", async () => {
    const totalBasicArticlesUnit = 1;
    const totalBasicArticleTitleUnit = 1;
    const handlerInput = {
      type: "ArticleSection",
      displayName: "business",
      displayNameColor: "red",
      content: {
        type: HandlerInputType.ArticleList,
        sourceId: Strap.EditorPicks,
        totalBasicArticlesUnit,
        totalBasicArticleTitleUnit,
        strapName: "business"
      }
    } as IBasicArticleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    const basicArticleListItems = [
      basicAdUnit,
      basicArticleUnit,
      basicAdUnit,
      basicArticleTitleUnit,
      basicAdUnit
    ];
    handlerRunnerMock.mockResolvedValue(basicArticleListItems);

    const contentBlocks = await basicArticleSectionHandler(
      handlerRunnerMock,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      {
        type: "BasicArticleSection",
        displayName: "business",
        displayNameColor: "red",
        items: basicArticleListItems
      },
      basicAdUnit
    ]);
    expect(handlerRunnerMock).toHaveBeenCalledWith(
      {
        type: HandlerInputType.ArticleList,
        sourceId: Strap.EditorPicks,
        strapName: "business",
        totalBasicArticlesUnit,
        totalBasicArticleTitleUnit
      },
      params
    );
  });
});
