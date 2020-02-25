import titleSectionHandler from "./title-section";
import { Section } from "../../section";
import { ITitleSectionHandlerInput } from "../__types__/ITitleSectionHandlerInput";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

jest.mock("../runner");

describe("TitleSectionHandler", () => {
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

  it("should get a section content block with only basic article units", async () => {
    const totalBasicArticlesUnit = 2;
    const handlerInput = {
      type: "TitleSection",
      linkUrl: "/business",
      displayName: "business",
      displayNameColor: "red",
      content: {
        type: HandlerInputType.ArticleList,
        sourceId: Section.Business,
        totalBasicArticlesUnit,
        strapName: "business"
      }
    } as ITitleSectionHandlerInput;

    const handlerRunnerMock = jest.fn();

    const basicArticleListItems = [
      basicAdUnit,
      basicArticleUnit,
      basicAdUnit,
      basicArticleUnit,
      basicAdUnit
    ];
    handlerRunnerMock.mockResolvedValue(basicArticleListItems);

    const contentBlocks = await titleSectionHandler(
      handlerRunnerMock,
      handlerInput,
      params
    );

    expect(contentBlocks).toEqual([
      expect.objectContaining({
        type: "GridContainer"
      })
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
});
