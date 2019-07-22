import { HandlerInputType } from './HandlerInputType';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';
import { Strap } from '../../strap';

export interface IStrapListArticleHandlerInput {
  type: HandlerInputType.StrapList;
  sourceId: Strap;
  strapName: string;
  layout?: LayoutType;
  totalBasicArticlesUnit?: number;
  totalBasicArticleTitleUnit?: number;
}
