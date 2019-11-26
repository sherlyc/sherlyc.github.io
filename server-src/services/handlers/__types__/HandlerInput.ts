import { IBasicArticleListHandlerInput } from './IBasicArticleListHandlerInput';
import { IBasicArticleSectionHandlerInput } from './IBasicArticleSectionHandlerInput';
import { IPageHandlerInput } from './IPageHandlerInput';
import { IBreakingNewsHandlerInput } from './IBreakingNewsHandlerInput';
import { IMidStripHandlerInput } from './IMidStripHandlerInput';
import { IExternalContentHandlerInput } from './IExternalContentHandlerInput';
import { IRecommendationsHandlerInput } from './IRecommendationsHandlerInput';
import { IWeatherHandlerInput } from './IWeatherHandlerInput';
import { IMiniMidStripHandlerInput } from './IMiniMidStripHandlerInput';
import { IExperimentHandlerInput } from './IExperimentHandlerInput';
import { ITopStoriesHandlerInput } from './ITopStoriesHandlerInput';
import { ITopStoriesArticleListHandlerInput } from './ITopStoriesArticleListHandlerInput';
import { IFeatureHandlerInput } from './IFeatureHandlerInput';
import { IBannerHandlerInput } from './IBannerHandlerInput';
import { IExpandableArticleListHandlerInput } from './IExpandableArticleListHandlerInput';
import { IExpandableArticleSectionHandlerInput } from './IExpandableArticleSectionHandlerInput';
import { IMoreSectionExperimentHandlerInput } from './IMoreSectionExperimentHandlerInput';
import { ITopStoriesArticleListGroupOneHandlerInput } from './ITopStoriesArticleListGroupOne';
import { ITopStoriesArticleListGroupTwoHandlerInput } from './ITopStoriesArticleListGroupTwo';
import { IGridContainerHandlerInput } from './IGridContainerHandlerInput';

export type HandlerInput =
  | ITopStoriesHandlerInput
  | ITopStoriesArticleListHandlerInput
  | ITopStoriesArticleListGroupOneHandlerInput
  | ITopStoriesArticleListGroupTwoHandlerInput
  | IBasicArticleListHandlerInput
  | IBannerHandlerInput
  | IMidStripHandlerInput
  | IMiniMidStripHandlerInput
  | IBasicArticleSectionHandlerInput
  | IExpandableArticleListHandlerInput
  | IExpandableArticleSectionHandlerInput
  | IMoreSectionExperimentHandlerInput
  | IBreakingNewsHandlerInput
  | IExternalContentHandlerInput
  | IPageHandlerInput
  | IWeatherHandlerInput
  | IExperimentHandlerInput
  | IFeatureHandlerInput
  | IRecommendationsHandlerInput
  | IGridContainerHandlerInput;
