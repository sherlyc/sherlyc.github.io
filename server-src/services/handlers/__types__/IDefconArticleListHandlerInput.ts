import { HandlerInputType } from './HandlerInputType';
import { ListAsset } from '../../../services/listAsset';

export interface IDefconArticleListHandlerInput {
  type: HandlerInputType.DefconArticleList;
  sourceId: ListAsset.TopStories;
  strapName: string;
  totalArticles?: number;
}
