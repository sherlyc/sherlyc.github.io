import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { IBasicArticleSectionHandlerInput } from './IBasicArticleSectionHandlerInput';
import { IPageHandlerInput } from './IPageHandlerInput';
import { IBreakingNewsHandlerInput } from './IBreakingNewsHandlerInput';
import { IMidStripHandlerInput } from './IMidStripHandlerInput';
import { IExternalContentHandlerInput } from './IExternalContentHandlerInput';
import { IWeatherHandlerInput } from './IWeatherHandlerInput';
import { IMiniMidStripHandlerInput } from './IMiniMidStripHandlerInput';
import { IVideoHandlerInput } from './IVideoHandlerInput';
import { IExperimentHandlerInput } from './IExperimentHandlerInput';
import { ITopStoriesHandlerInput } from './ITopStoriesHandlerInput';
import { IDefconArticleListHandlerInput } from './IDefconArticleListHandlerInput';
import { IFeatureHandlerInput } from './IFeatureHandlerInput';
import { IStrapListHandlerInput } from './StrapListHandlerInput';

export type HandlerInput =
  | ITopStoriesHandlerInput
  | IDefconArticleListHandlerInput
  | IBasicArticleListHandlerInput
  | IMidStripHandlerInput
  | IMiniMidStripHandlerInput
  | IBasicArticleSectionHandlerInput
  | IBreakingNewsHandlerInput
  | IExternalContentHandlerInput
  | IPageHandlerInput
  | IWeatherHandlerInput
  | IVideoHandlerInput
  | IExperimentHandlerInput
  | IFeatureHandlerInput
  | IStrapListHandlerInput;
