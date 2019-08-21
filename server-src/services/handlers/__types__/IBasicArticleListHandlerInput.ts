import { HandlerInputType } from './HandlerInputType';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';
import { Strap } from '../../strap';
import { Section } from '../../section';

export interface IBasicArticleListHandlerInput {
  type: HandlerInputType.ArticleList;
  sourceId: Section | Strap;
  strapName: string;
  layout?: LayoutType;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
  variant: string;
}
