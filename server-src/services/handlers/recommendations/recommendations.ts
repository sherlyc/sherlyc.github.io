import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IRecommendationsHandlerInput } from "../__types__/IRecommendationsHandlerInput";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
    totalBasicArticlesUnit,
    totalBasicArticleTitleUnit
  }: IRecommendationsHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    {
      type: ContentBlockType.Recommendations,
      displayName,
      displayNameColor,
      totalBasicArticlesUnit,
      totalBasicArticleTitleUnit
    }
  ];
}
