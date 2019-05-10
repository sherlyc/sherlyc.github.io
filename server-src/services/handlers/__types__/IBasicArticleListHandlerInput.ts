import { Section } from '../../section';
import { ListAsset } from '../../listAsset';
import { HandlerInputType } from './HandlerInputType';

export interface IBasicArticleListHandlerInput {
  type: HandlerInputType.ArticleList;
  sourceId: Section | ListAsset;
  totalArticles: number;
  totalImageArticles?: number;
}
