import { HandlerInputType } from './HandlerInputType';

export interface IRecommendationsHandlerInput {
  type: HandlerInputType.Recommendations;
  strapName: string;
  totalBasicArticlesUnit: number;
  totalBasicArticleTitleUnit: number;
}
