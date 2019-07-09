import { Section } from '../../section';
import { ListAsset } from '../../listAsset';
import { HandlerInputType } from './HandlerInputType';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';

export interface IBasicArticleListHandlerInput {
  type: HandlerInputType.ArticleList;
  sourceId: Section | ListAsset;
  strapName: string;
  layout?: LayoutType;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
}
