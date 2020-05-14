import { IBannerHandlerInput } from "./IBannerHandlerInput";
import { IBasicArticleListHandlerInput } from "./IBasicArticleListHandlerInput";
import { IBasicArticleSectionHandlerInput } from "./IBasicArticleSectionHandlerInput";
import { ITitleSectionHandlerInput } from "./ITitleSectionHandlerInput";
import { IBiggieSmallsGridHandlerInput } from "./IBiggieSmallsGridHandlerInput";
import { IBiggieSmallsHandlerInput } from "./IBiggieSmallsHandlerInput";
import { IBreakingNewsHandlerInput } from "./IBreakingNewsHandlerInput";
import { IColumnGridHandlerInput } from "./IColumnGridHandlerInput";
import { IContentBlockHandlerInput } from "./IContentBlockHandlerInput";
import { IExperimentHandlerInput } from "./IExperimentHandlerInput";
import { IExternalContentHandlerInput } from "./IExternalContentHandlerInput";
import { IFeatureHandlerInput } from "./IFeatureHandlerInput";
import { IForceUpdateHandlerInput } from "./IForceUpdateHandlerInput";
import { ILargeLeadSixGridHandlerInput } from "./ILargeLeadSixGridHandlerInput";
import { ILargeLeadSixHandlerInput } from "./ILargeLeadSixHandlerInput";
import { IListGridHandlerInput } from "./IListGridHandlerInput";
import { IMidStripHandlerInput } from "./IMidStripHandlerInput";
import { IMiniMidStripHandlerInput } from "./IMiniMidStripHandlerInput";
import { INewsSixGridHandlerInput } from "./INewsSixGridHandlerInput";
import { INewsSixHandlerInput } from "./INewsSixHandlerInput";
import { IPageHandlerInput } from "./IPageHandlerInput";
import { IRelevantStoriesHandlerInput } from "./IRelevantStoriesHandlerInput";
import { IRelevantStoriesGridHandlerInput } from "./IRelevantStoriesGridHandlerInput";
import { ISixImageGridHandlerInput } from "./ISixImageGridHandlerInput";
import { ISixImageHandlerInput } from "./ISixImageHandlerInput";
import { IStripsGridHandlerInput } from "./IStripsGridHandlerInput";
import { IStripsHandlerInput } from "./IStripsHandlerInput";
import { ITopStoriesArticleListHandlerInput } from "./ITopStoriesArticleListHandlerInput";
import { ITopStoriesDefaultOneHighlightHandlerInput } from "./ITopStoriesDefaultOneHighlightHandlerInput";
import { ITopStoriesDefconHighlightHandlerInput } from "./ITopStoriesDefconHighlightHandlerInput";
import { ITopStoriesGridHandlerInput } from "./ITopStoriesGridHandlerInput";
import { ITopStoriesHandlerInput } from "./ITopStoriesHandlerInput";
import { IWeatherHandlerInput } from "./IWeatherHandlerInput";
import { IBrandGridHandlerInput } from "./IBrandGridHandlerInput";
import { IBrandHandlerInput } from "./IBrandHandlerInput";
import { IResponsiveExternalContentHandlerInput } from "./IResponsiveExternalContentHandlerInput";
import { IHalfFourGridHandlerInput } from "./IHalfFourGridHandlerInput";
import {IHalfFourHandlerInput} from "./IHalfFourHandlerInput";

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
  | IColumnGridHandlerInput
  | IBrandHandlerInput
  | IBrandGridHandlerInput
  | ITitleSectionHandlerInput
  | IResponsiveExternalContentHandlerInput
  | IHalfFourHandlerInput
  | IHalfFourGridHandlerInput;
