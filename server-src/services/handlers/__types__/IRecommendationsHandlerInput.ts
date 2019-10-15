import { HandlerInputType } from './HandlerInputType';

export interface IRecommendationsHandlerInput {
  type: HandlerInputType.Recommendations;
  strapName: string;
  totalArticles: number;
}
