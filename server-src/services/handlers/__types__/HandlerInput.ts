import { IBasicArticleListHandlerInput } from "./IBasicArticleListHandlerInput";
import { IBasicArticleSectionHandlerInput } from "./IBasicArticleSectionHandlerInput";
import { IPageHandlerInput } from "./IPageHandlerInput";
import { IBreakingNewsHandlerInput } from "./IBreakingNewsHandlerInput";
import { IMidStripHandlerInput } from "./IMidStripHandlerInput";
import { IExternalContentHandlerInput } from "./IExternalContentHandlerInput";
import { IRecommendationsHandlerInput } from "./IRecommendationsHandlerInput";
import { IWeatherHandlerInput } from "./IWeatherHandlerInput";
import { IMiniMidStripHandlerInput } from "./IMiniMidStripHandlerInput";
import { IExperimentHandlerInput } from "./IExperimentHandlerInput";
import { ITopStoriesArticleListHandlerInput } from "./ITopStoriesArticleListHandlerInput";
import { IFeatureHandlerInput } from "./IFeatureHandlerInput";
import { IBannerHandlerInput } from "./IBannerHandlerInput";
import { IExpandableArticleListHandlerInput } from "./IExpandableArticleListHandlerInput";
import { IExpandableArticleSectionHandlerInput } from "./IExpandableArticleSectionHandlerInput";
import { IMoreSectionExperimentHandlerInput } from "./IMoreSectionExperimentHandlerInput";
import { INewsSixHandlerInput } from "./INewsSixHandlerInput";
import { INewsSixGridHandlerInput } from "./INewsSixGridHandlerInput";
import { ISixImageHandlerInput } from "./ISixImageHandlerInput";
import { ISixImageGridHandlerInput } from "./ISixImageGridHandlerInput";
import { ILargeLeadSixHandlerInput } from "./ILargeLeadSixHandlerInput";
import { ILargeLeadSixGridHandlerInput } from "./ILargeLeadSixGridHandlerInput";
import { IListGridHandlerInput } from "./IListGridHandlerInput";
import { IColumnGridHandlerInput } from "./IColumnGridHandlerInput";
import { IForceUpdateHandlerInput } from "./IForceUpdateHandlerInput";

export type HandlerInput =
  | ITopStoriesArticleListHandlerInput
  | IBasicArticleListHandlerInput
  | IBannerHandlerInput
  | IForceUpdateHandlerInput
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
  | INewsSixHandlerInput
  | INewsSixGridHandlerInput
  | ISixImageHandlerInput
  | ISixImageGridHandlerInput
  | ILargeLeadSixHandlerInput
  | ILargeLeadSixGridHandlerInput
  | IListGridHandlerInput
  | IColumnGridHandlerInput;
