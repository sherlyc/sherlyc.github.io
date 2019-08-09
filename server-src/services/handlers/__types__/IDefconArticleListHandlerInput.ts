import { HandlerInputType } from './HandlerInputType';
import { ListAsset } from '../../../services/listAsset';
import { Strap } from '../../strap';

export interface IDefconArticleListHandlerInput {
  type: HandlerInputType.DefconArticleList;
  sourceId: Strap.TopStories;
  strapName: string;
  totalArticles?: number;
}
