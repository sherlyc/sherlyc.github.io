import { HandlerInputType } from './HandlerInputType';

export interface ITopStoriesHandlerInput {
  type: HandlerInputType.TopStories;
  strapName: string;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
}
