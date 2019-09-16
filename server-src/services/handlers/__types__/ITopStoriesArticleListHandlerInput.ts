import { HandlerInputType } from './HandlerInputType';
import { Strap } from '../../strap';

export interface ITopStoriesArticleListHandlerInput {
  type: HandlerInputType.TopStoriesArticleList;
  sourceId: Strap.TopStories;
  strapName: string;
  totalArticles?: number;
  variant?: string;
}
