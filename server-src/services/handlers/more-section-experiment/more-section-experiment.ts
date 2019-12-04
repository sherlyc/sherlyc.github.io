import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IMoreSectionExperimentHandlerInput } from "../__types__/IMoreSectionExperimentHandlerInput";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { ExperimentName } from "../../../../common/ExperimentName";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    linkUrl,
    displayName,
    displayNameColor,
    sourceId,
    strapName,
    totalBasicArticlesUnit,
    totalBasicArticleTitleUnit
  }: IMoreSectionExperimentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return handlerRunner(
    {
      type: HandlerInputType.Experiment,
      name: ExperimentName.MoreSection,
      variants: {
        control: {
          type: HandlerInputType.ArticleSection,
          linkUrl,
          displayName,
          displayNameColor,
          content: {
            type: HandlerInputType.ArticleList,
            sourceId,
            strapName,
            totalBasicArticlesUnit,
            totalBasicArticleTitleUnit
          }
        },
        groupOne: {
          type: HandlerInputType.ExpandableArticleSection,
          linkUrl,
          displayName,
          displayNameColor,
          content: {
            type: HandlerInputType.ExpandableArticleList,
            sourceId,
            strapName,
            basicArticlesPerPage: totalBasicArticlesUnit,
            basicTitleArticlesPerPage: totalBasicArticleTitleUnit,
            pages: 2
          }
        },
        groupTwo: {
          type: HandlerInputType.ExpandableArticleSection,
          linkUrl,
          displayName,
          displayNameColor,
          content: {
            type: HandlerInputType.ExpandableArticleList,
            sourceId,
            strapName,
            basicArticlesPerPage: totalBasicArticlesUnit,
            basicTitleArticlesPerPage: totalBasicArticleTitleUnit,
            pages: 3
          }
        }
      }
    },
    params
  );
}
