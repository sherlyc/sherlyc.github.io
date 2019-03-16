import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { Omit } from '../../../../common/__types__/types';

export interface IBasicArticleSectionHandlerInput {
  type: 'ArticleSection';
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  articleList: Omit<IBasicArticleListHandlerInput, 'type'>;
}
