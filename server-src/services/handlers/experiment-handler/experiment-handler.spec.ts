import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBreakingNews } from "../../../../common/__types__/IBreakingNews";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IExperimentContainer } from "../../../../common/__types__/IExperimentContainer";
import { Section } from "../../section";
import { IParams } from "../../__types__/IParams";
import { HandlerInputType } from "../__types__/HandlerInputType";
import experimentHandler from "./experiment-handler";

describe("Experiment Handler", () => {
  const params: IParams = { apiRequestId: "request-id-for-testing" };

  it("should return Toucan content block when experiment name is Toucan", async () => {
    const handlerRunnerMock = jest.fn();
    const breakingNewsBlock = {
      type: ContentBlockType.BreakingNews,
      id: "fake",
      text: "fake",
      link: "fake"
    } as IBreakingNews;
    handlerRunnerMock.mockResolvedValue([breakingNewsBlock]);

    const expectedResult: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: "Toucan",
      variants: {
        purpleHeadline: [breakingNewsBlock],
        orangeHeadline: [breakingNewsBlock],
        control: [breakingNewsBlock]
      }
    };

    const result = await experimentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Experiment,
        name: "Toucan",
        variants: {
          purpleHeadline: {
            type: HandlerInputType.BreakingNews
          },
          orangeHeadline: {
            type: HandlerInputType.BreakingNews
          },
          control: {
            type: HandlerInputType.BreakingNews
          }
        }
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });

  it("should return Parrot content block when experiment name is Parrot", async () => {
    const handlerRunnerMock = jest.fn();
    const basicArticleUnit: IContentBlock = {
      type: ContentBlockType.BasicArticleUnit,
      strapName: "fake",
      id: "fake",
      indexHeadline: "fake",
      title: "fake",
      introText: "fake",
      linkUrl: "fake",
      imageSrc: "fake",
      imageSrcSet: "fake",
      lastPublishedTime: 0,
      headlineFlags: []
    };
    handlerRunnerMock.mockResolvedValue([basicArticleUnit, basicArticleUnit]);

    const expectedResult: IExperimentContainer = {
      type: ContentBlockType.ExperimentContainer,
      name: "Parrot",
      variants: {
        redHeadline: [basicArticleUnit, basicArticleUnit],
        greenHeadline: [basicArticleUnit, basicArticleUnit],
        control: [basicArticleUnit, basicArticleUnit]
      }
    };

    const result = await experimentHandler(
      handlerRunnerMock,
      {
        type: HandlerInputType.Experiment,
        name: "Parrot",
        variants: {
          redHeadline: {
            type: HandlerInputType.ArticleList,
            strapName: "fake",
            sourceId: Section.Latest,
            totalBasicArticlesUnit: 2
          },
          greenHeadline: {
            type: HandlerInputType.ArticleList,
            strapName: "fake",
            sourceId: Section.Latest,
            totalBasicArticlesUnit: 2
          },
          control: {
            type: HandlerInputType.ArticleList,
            strapName: "fake",
            sourceId: Section.Latest,
            totalBasicArticlesUnit: 2
          }
        }
      },
      params
    );

    expect(result).toEqual([expectedResult]);
  });

  it("should throw error if content block rendered throws error", async () => {
    const error = new Error("content block error");
    const handlerRunnerMock = jest.fn();
    handlerRunnerMock.mockRejectedValue(error);

    await expect(
      experimentHandler(
        handlerRunnerMock,
        {
          type: HandlerInputType.Experiment,
          name: "Experiment",
          variants: {
            control: {
              type: HandlerInputType.ArticleList,
              strapName: "fake",
              sourceId: Section.Latest,
              totalBasicArticlesUnit: 0
            }
          }
        },
        params
      )
    ).rejects.toEqual(error);
  });
});
