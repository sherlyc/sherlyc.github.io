import { HandlerInputType } from './HandlerInputType';
import { Strap } from '../../strap';
import { LayoutType } from '../../adapters/__types__/LayoutType';

export interface ITopStoriesArticleListHandlerInput {
  type: HandlerInputType.DefconArticleList;
  sourceId: Strap.TopStories;
  strapName: string;
  layoutType: LayoutType;
  totalArticles?: number;
  variant?: string;
}
