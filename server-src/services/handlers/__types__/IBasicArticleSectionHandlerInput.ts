import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { Omit } from 'utility-types';

export interface IBasicArticleSectionHandlerInput {
  type: 'ArticleSection';
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  articleList: Omit<IBasicArticleListHandlerInput, 'type'>;
}
