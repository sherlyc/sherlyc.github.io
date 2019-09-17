import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { IBasicArticleSectionHandlerInput } from './IBasicArticleSectionHandlerInput';
import { IPageHandlerInput } from './IPageHandlerInput';
import { IBreakingNewsHandlerInput } from './IBreakingNewsHandlerInput';
import { IMidStripHandlerInput } from './IMidStripHandlerInput';
import { IExternalContentHandlerInput } from './IExternalContentHandlerInput';
import { IWeatherHandlerInput } from './IWeatherHandlerInput';
import { IMiniMidStripHandlerInput } from './IMiniMidStripHandlerInput';
import { IExperimentHandlerInput } from './IExperimentHandlerInput';
import { ITopStoriesHandlerInput } from './ITopStoriesHandlerInput';
import { ITopStoriesArticleListHandlerInput } from './ITopStoriesArticleListHandlerInput';
import { IFeatureHandlerInput } from './IFeatureHandlerInput';
import { IBannerHandlerInput } from './IBannerHandlerInput';
import { ITopStoriesArticleListGroupOneHandlerInput } from './ITopStoriesArticleListGroupOne';

export type HandlerInput =
  | ITopStoriesHandlerInput
  | ITopStoriesArticleListHandlerInput
  | ITopStoriesArticleListGroupOneHandlerInput
  | IBasicArticleListHandlerInput
  | IBannerHandlerInput
  | IMidStripHandlerInput
  | IMiniMidStripHandlerInput
  | IBasicArticleSectionHandlerInput
  | IBreakingNewsHandlerInput
  | IExternalContentHandlerInput
  | IPageHandlerInput
  | IWeatherHandlerInput
  | IExperimentHandlerInput
  | IFeatureHandlerInput;
