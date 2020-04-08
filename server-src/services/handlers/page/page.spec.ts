import { IParams } from "../../__types__/IParams";
import { Section } from "../../section";
import { IPageHandlerInput } from "../__types__/IPageHandlerInput";
import pageHandler from "./page";

const latestArticles = require("../__fixtures__/latest-articles.json");
const sportSection = require("../__fixtures__/sport-section.json");
const nationalSection = require("../__fixtures__/national-section.json");
const pageHandlerOutput = require("../__fixtures__/page-handler-output.json");

jest.mock("../runner");
describe("PageHandler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };
  it("should get a page content block", async () => {
    const pageHandlerInput = {
      type: "Page",
      items: [
        {
          type: "ArticleList",
          sourceId: Section.Latest,
          totalBasicArticlesUnit: 3
        },
        {
          type: "ArticleSection",
          displayName: "Sport",
          displayNameColor: "blue",
          linkUrl: "/" + Section.Sport,
          articleList: { sourceId: Section.Sport, totalBasicArticlesUnit: 3 }
        },
        {
          type: "ArticleSection",
          displayName: "National",
          displayNameColor: "red",
          linkUrl: "/" + Section.National,
          articleList: { sourceId: Section.National, totalBasicArticlesUnit: 3 }
        }
      ]
    } as IPageHandlerInput;

    const handlerRunnerMock = jest.fn();

    handlerRunnerMock.mockResolvedValueOnce(latestArticles);
    handlerRunnerMock.mockResolvedValueOnce(sportSection);
    handlerRunnerMock.mockResolvedValueOnce(nationalSection);

    const contentBlocks = await pageHandler(
      handlerRunnerMock,
      pageHandlerInput,
      params
    );
    expect(contentBlocks).toEqual(pageHandlerOutput);
  });
});
