import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { IBasicArticleSectionHandlerInput } from './IBasicArticleSectionHandlerInput';
import { IPageHandlerInput } from './IPageHandlerInput';
import { IBreakingNewsHandlerInput } from './IBreakingNewsHandlerInput';
import { IMidStripHandlerInput } from './IMidStripHandlerInput';

export type HandlerInput =
  | IBasicArticleListHandlerInput
  | IMidStripHandlerInput
  | IBasicArticleSectionHandlerInput
  | IBreakingNewsHandlerInput
  | IPageHandlerInput;
