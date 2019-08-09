import { HandlerInputType } from './HandlerInputType';
import { ListAsset } from '../../listAsset';
import { Strap } from '../../strap';

export interface ITopStoriesHandlerInput {
  type: HandlerInputType.TopStories;
  sourceId: Strap.TopStories;
  strapName: string;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
}
