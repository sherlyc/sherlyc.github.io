import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { Omit } from 'utility-types';
import { HandlerInputType } from './HandlerInputType';

export interface IBasicArticleSectionHandlerInput {
  type: HandlerInputType.ArticleSection;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  articleList: Omit<IBasicArticleListHandlerInput, 'type'>;
}
