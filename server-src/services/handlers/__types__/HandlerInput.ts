import { IBannerHandlerInput } from "./IBannerHandlerInput";
import { IBasicArticleListHandlerInput } from "./IBasicArticleListHandlerInput";
import { IBasicArticleSectionHandlerInput } from "./IBasicArticleSectionHandlerInput";
import { IBiggieSmallsGridHandlerInput } from "./IBiggieSmallsGridHandlerInput";
import { IBiggieSmallsHandlerInput } from "./IBiggieSmallsHandlerInput";
import { IBrandGridHandlerInput } from "./IBrandGridHandlerInput";
import { IBrandHandlerInput } from "./IBrandHandlerInput";
import { IBreakingNewsHandlerInput } from "./IBreakingNewsHandlerInput";
import { IColumnGridHandlerInput } from "./IColumnGridHandlerInput";
import { IColumnHandlerInput } from "./IColumnHandlerInput";
import { IContentBlockHandlerInput } from "./IContentBlockHandlerInput";
import { IExperimentHandlerInput } from "./IExperimentHandlerInput";
import { IExternalContentHandlerInput } from "./IExternalContentHandlerInput";
import { IFeatureHandlerInput } from "./IFeatureHandlerInput";
import { IForceUpdateHandlerInput } from "./IForceUpdateHandlerInput";
import { IHalfFourGridHandlerInput } from "./IHalfFourGridHandlerInput";
import { IHalfFourHandlerInput } from "./IHalfFourHandlerInput";
import { ILargeLeadSixGridHandlerInput } from "./ILargeLeadSixGridHandlerInput";
import { ILargeLeadSixHandlerInput } from "./ILargeLeadSixHandlerInput";
import { IListGridHandlerInput } from "./IListGridHandlerInput";
import { IMidStripHandlerInput } from "./IMidStripHandlerInput";
import { IMiniMidStripHandlerInput } from "./IMiniMidStripHandlerInput";
import { INewsSixGridHandlerInput } from "./INewsSixGridHandlerInput";
import { INewsSixHandlerInput } from "./INewsSixHandlerInput";
import { IPageHandlerInput } from "./IPageHandlerInput";
import { IRelevantStoriesGridHandlerInput } from "./IRelevantStoriesGridHandlerInput";
import { IRelevantStoriesHandlerInput } from "./IRelevantStoriesHandlerInput";
import { IResponsiveExternalContentHandlerInput } from "./IResponsiveExternalContentHandlerInput";
import { ISixImageGridHandlerInput } from "./ISixImageGridHandlerInput";
import { ISixImageHandlerInput } from "./ISixImageHandlerInput";
import { IStripsGridHandlerInput } from "./IStripsGridHandlerInput";
import { IStripsHandlerInput } from "./IStripsHandlerInput";
import { ITitleSectionHandlerInput } from "./ITitleSectionHandlerInput";
import { ITopStoriesArticleListHandlerInput } from "./ITopStoriesArticleListHandlerInput";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "./ITopStoriesDefaultOneHighlightHandlerInput";
import { ITopStoriesDefconHighlightHandlerInput } from "./ITopStoriesDefconHighlightHandlerInput";
import { ITopStoriesGridHandlerInput } from "./ITopStoriesGridHandlerInput";
import { ITopStoriesHandlerInput } from "./ITopStoriesHandlerInput";
import { ITopStoriesV2GridHandlerInput } from "./ITopStoriesV2GridHandlerInput";
import { ITopStoriesV2HandlerInput } from "./ITopStoriesV2HandlerInput";
import { IWeatherHandlerInput } from "./IWeatherHandlerInput";

export type HandlerInput =
  | IContentBlockHandlerInput
  | ITopStoriesArticleListHandlerInput
  | IBasicArticleListHandlerInput
  | IBannerHandlerInput
  | IForceUpdateHandlerInput
  | IMidStripHandlerInput
  | IMiniMidStripHandlerInput
  | IBasicArticleSectionHandlerInput
  | IBreakingNewsHandlerInput
  | IExternalContentHandlerInput
  | IPageHandlerInput
  | IWeatherHandlerInput
  | IExperimentHandlerInput
  | IFeatureHandlerInput
  | ITopStoriesHandlerInput
  | ITopStoriesDefaultOneHighlightHandlerInput
  | ITopStoriesDefconHighlightHandlerInput
  | ITopStoriesGridHandlerInput
  | ITopStoriesV2HandlerInput
  | ITopStoriesV2GridHandlerInput
  | IBiggieSmallsHandlerInput
  | IBiggieSmallsGridHandlerInput
  | INewsSixHandlerInput
  | INewsSixGridHandlerInput
  | ISixImageHandlerInput
  | ISixImageGridHandlerInput
  | IStripsHandlerInput
  | IStripsGridHandlerInput
  | ILargeLeadSixHandlerInput
  | ILargeLeadSixGridHandlerInput
  | IListGridHandlerInput
  | IRelevantStoriesHandlerInput
  | IRelevantStoriesGridHandlerInput
  | IColumnHandlerInput
  | IColumnGridHandlerInput
  | IBrandHandlerInput
  | IBrandGridHandlerInput
  | ITitleSectionHandlerInput
  | IResponsiveExternalContentHandlerInput
  | IHalfFourHandlerInput
  | IHalfFourGridHandlerInput;
