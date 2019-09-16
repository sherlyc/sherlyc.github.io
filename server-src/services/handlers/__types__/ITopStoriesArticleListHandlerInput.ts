import { HandlerInputType } from './HandlerInputType';
import { Strap } from '../../strap';

export interface ITopStoriesArticleListHandlerInput {
  type: HandlerInputType.TopStoriesArticleList;
  strapName: string;
  totalArticles?: number;
}
