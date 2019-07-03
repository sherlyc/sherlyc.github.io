import { HandlerInputType } from './HandlerInputType';
import { ListAsset } from 'server-src/services/listAsset';

export interface IDefconArticleListHandlerInput {
  type: HandlerInputType.DefconArticleList;
  sourceId: ListAsset.TopStories;
  strapName: string;
  totalArticles?: number;
}
