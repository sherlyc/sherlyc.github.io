import { IBannerHandlerInput } from "./IBannerHandlerInput";
import { IBasicArticleListHandlerInput } from "./IBasicArticleListHandlerInput";
import { IBasicArticleSectionHandlerInput } from "./IBasicArticleSectionHandlerInput";
import { IBiggieSmallsGridHandlerInput } from "./IBiggieSmallsGridHandlerInput";
import { IBiggieSmallsHandlerInput } from "./IBiggieSmallsHandlerInput";
import { IBreakingNewsHandlerInput } from "./IBreakingNewsHandlerInput";
import { IColumnGridHandlerInput } from "./IColumnGridHandlerInput";
import { IExpandableArticleListHandlerInput } from "./IExpandableArticleListHandlerInput";
import { IExpandableArticleSectionHandlerInput } from "./IExpandableArticleSectionHandlerInput";
import { IExperimentHandlerInput } from "./IExperimentHandlerInput";
import { IExternalContentHandlerInput } from "./IExternalContentHandlerInput";
import { IFeatureHandlerInput } from "./IFeatureHandlerInput";
import { IForceUpdateHandlerInput } from "./IForceUpdateHandlerInput";
import { ILargeLeadSixGridHandlerInput } from "./ILargeLeadSixGridHandlerInput";
import { ILargeLeadSixHandlerInput } from "./ILargeLeadSixHandlerInput";
import { IListGridHandlerInput } from "./IListGridHandlerInput";
import { IMidStripHandlerInput } from "./IMidStripHandlerInput";
import { IMiniMidStripHandlerInput } from "./IMiniMidStripHandlerInput";
import { IMoreSectionExperimentHandlerInput } from "./IMoreSectionExperimentHandlerInput";
import { INewsSixGridHandlerInput } from "./INewsSixGridHandlerInput";
import { INewsSixHandlerInput } from "./INewsSixHandlerInput";
import { IPageHandlerInput } from "./IPageHandlerInput";
import { IRecommendationsHandlerInput } from "./IRecommendationsHandlerInput";
import { IRelevantStoriesHandlerInput } from "./IRelevantStoriesHandlerInput";
import { ISixImageGridHandlerInput } from "./ISixImageGridHandlerInput";
import { ISixImageHandlerInput } from "./ISixImageHandlerInput";
import { ITopStoriesArticleListHandlerInput } from "./ITopStoriesArticleListHandlerInput";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "./ITopStoriesDefaultOneHighlightHandlerInput";
import { ITopStoriesDefconHighlightHandlerInput } from "./ITopStoriesDefconHighlightHandlerInput";
import { ITopStoriesGridHandlerInput } from "./ITopStoriesGridHandlerInput";
import { ITopStoriesHandlerInput } from "./ITopStoriesHandlerInput";
import { IWeatherHandlerInput } from "./IWeatherHandlerInput";
import { IContentBlockHandlerInput } from "./IContentBlockHandlerInput";
import { IBrandGridHandlerInput } from "./IBrandGridHandlerInput";
import { IBrandHandlerInput } from "./IBrandHandlerInput";

export type HandlerInput =
  | IContentBlockHandlerInput
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
  | ITopStoriesHandlerInput
  | ITopStoriesDefaultOneHighlightHandlerInput
  | ITopStoriesDefconHighlightHandlerInput
  | ITopStoriesGridHandlerInput
  | IBiggieSmallsHandlerInput
  | IBiggieSmallsGridHandlerInput
  | INewsSixHandlerInput
  | INewsSixGridHandlerInput
  | ISixImageHandlerInput
  | ISixImageGridHandlerInput
  | ILargeLeadSixHandlerInput
  | ILargeLeadSixGridHandlerInput
  | IListGridHandlerInput
  | IRelevantStoriesHandlerInput
  | IColumnGridHandlerInput
  | IBrandHandlerInput
  | IBrandGridHandlerInput;
