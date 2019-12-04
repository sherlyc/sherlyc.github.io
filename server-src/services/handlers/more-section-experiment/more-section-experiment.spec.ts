import { IParams } from "../../__types__/IParams";
import moreSectionExperiment from "./more-section-experiment";
import { IMoreSectionExperimentHandlerInput } from "../__types__/IMoreSectionExperimentHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { Section } from "../../section";
import { ExperimentName } from "../../../../common/ExperimentName";

describe("More section experiment", () => {
  it("should return experiment container with control, groupOne and groupTwo", () => {
    const handlerRunner = jest.fn();
    const params: IParams = { apiRequestId: "123123" };
    const handlerInput: IMoreSectionExperimentHandlerInput = {
      type: HandlerInputType.MoreSectionExperimentHandlerInput,
      linkUrl: "/frank",
      displayName: "Frank",
      displayNameColor: "Pink",
      strapName: "Frank",
      sourceId: Section.BeautyHeaven,
      totalBasicArticlesUnit: 2,
      totalBasicArticleTitleUnit: 3
    };

    moreSectionExperiment(handlerRunner, handlerInput, params);

    expect(handlerRunner).toHaveBeenCalledWith(
      {
        type: HandlerInputType.Experiment,
        name: ExperimentName.MoreSection,
        variants: {
          control: {
            type: HandlerInputType.ArticleSection,
            linkUrl: handlerInput.linkUrl,
            displayName: handlerInput.displayName,
            displayNameColor: handlerInput.displayNameColor,
            content: {
              type: HandlerInputType.ArticleList,
              sourceId: handlerInput.sourceId,
              strapName: handlerInput.strapName,
              totalBasicArticlesUnit: handlerInput.totalBasicArticlesUnit,
              totalBasicArticleTitleUnit:
                handlerInput.totalBasicArticleTitleUnit
            }
          },
          groupOne: {
            type: HandlerInputType.ExpandableArticleSection,
            linkUrl: handlerInput.linkUrl,
            displayName: handlerInput.displayName,
            displayNameColor: handlerInput.displayNameColor,
            content: {
              type: HandlerInputType.ExpandableArticleList,
              sourceId: handlerInput.sourceId,
              strapName: handlerInput.strapName,
              basicArticlesPerPage: handlerInput.totalBasicArticlesUnit,
              basicTitleArticlesPerPage:
                handlerInput.totalBasicArticleTitleUnit,
              pages: 2
            }
          },
          groupTwo: {
            type: HandlerInputType.ExpandableArticleSection,
            linkUrl: handlerInput.linkUrl,
            displayName: handlerInput.displayName,
            displayNameColor: handlerInput.displayNameColor,
            content: {
              type: HandlerInputType.ExpandableArticleList,
              sourceId: handlerInput.sourceId,
              strapName: handlerInput.strapName,
              basicArticlesPerPage: handlerInput.totalBasicArticlesUnit,
              basicTitleArticlesPerPage:
                handlerInput.totalBasicArticleTitleUnit,
              pages: 3
            }
          }
        }
      },
      params
    );
  });
});
