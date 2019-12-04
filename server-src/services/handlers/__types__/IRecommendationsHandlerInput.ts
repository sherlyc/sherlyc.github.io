import { HandlerInputType } from "./HandlerInputType";

export interface IRecommendationsHandlerInput {
  type: HandlerInputType.Recommendations;
  displayName: string;
  displayNameColor: string;
  totalBasicArticlesUnit: number;
  totalBasicArticleTitleUnit: number;
}
