import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { IBasicArticleSectionHandlerInput } from './IBasicArticleSectionHandlerInput';
import { IPageHandlerInput } from './IPageHandlerInput';

export type HandlerInput =
  | IBasicArticleListHandlerInput
  | IBasicArticleSectionHandlerInput
  | IPageHandlerInput;
