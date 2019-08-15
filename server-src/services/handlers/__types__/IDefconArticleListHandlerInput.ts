import { HandlerInputType } from './HandlerInputType';
import { Strap } from '../../strap';

export interface IDefconArticleListHandlerInput {
  type: HandlerInputType.DefconArticleList;
  sourceId: Strap.TopStories;
  strapName: string;
  totalArticles?: number;
}
