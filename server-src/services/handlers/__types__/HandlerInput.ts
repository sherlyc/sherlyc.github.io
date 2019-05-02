import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { IBasicArticleSectionHandlerInput } from './IBasicArticleSectionHandlerInput';
import { IPageHandlerInput } from './IPageHandlerInput';
import { IBreakingNewsHandlerInput } from './IBreakingNewsHandlerInput';
import { IMidStripHandlerInput } from './IMidStripHandlerInput';
import { IExternalContentHandlerInput } from './IExternalContentHandlerInput';
import { IWeatherHandlerInput } from './IWeatherHandlerInput';

export type HandlerInput =
  | IBasicArticleListHandlerInput
  | IMidStripHandlerInput
  | IBasicArticleSectionHandlerInput
  | IBreakingNewsHandlerInput
  | IExternalContentHandlerInput
  | IPageHandlerInput
  | IWeatherHandlerInput;
