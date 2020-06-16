import { IBannerHandlerInput } from "./IBannerHandlerInput";
import { IBasicArticleListHandlerInput } from "./IBasicArticleListHandlerInput";
import { IBasicArticleSectionHandlerInput } from "./IBasicArticleSectionHandlerInput";
import { IBiggieSmallsGridHandlerInput } from "./IBiggieSmallsGridHandlerInput";
import { IBiggieSmallsHandlerInput } from "./IBiggieSmallsHandlerInput";
import { IBiggieSmallsV2HandlerInput } from "./IBiggieSmallsV2HandlerInput";
import { IBiggieSmallsV2GridHandlerInput } from "./IBiggieSmallsV2GridHandlerInput";
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
import { ILatestHeadlinesHandlerInput } from "./ILatestHeadlinesHandlerInput";
import { IListGridHandlerInput } from "./IListGridHandlerInput";
import { IMidStripHandlerInput } from "./IMidStripHandlerInput";
import { IMiniMidStripHandlerInput } from "./IMiniMidStripHandlerInput";
import { INewsSixGridHandlerInput } from "./INewsSixGridHandlerInput";
import { INewsSixGridV2HandlerInput } from "./INewsSixGridV2HandlerInput";
import { INewsSixHandlerInput } from "./INewsSixHandlerInput";
import { INewsSixV2HandlerInput } from "./INewsSixV2HandlerInput";
import { IPageHandlerInput } from "./IPageHandlerInput";
import { IPartnerHandlerInput } from "./IPartnerHandlerInput";
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
import { ITopStoriesV2DefaultGridHandlerInput } from "./ITopStoriesV2DefaultGridHandlerInput";
import { ITopStoriesV2DefaultHandlerInput } from "./ITopStoriesV2DefaultHandlerInput";
import { IVersionSwitcherHandlerInput } from "./IVersionSwitcherHandlerInput";
import { IWeatherHandlerInput } from "./IWeatherHandlerInput";
import { IPlayStuffHandlerInput } from "./IPlayStuffHandlerInput";
import { IEditorsPicksGridHandlerInput } from "./IEditorsPicksGridHandlerInput";
import { IEditorsPicksHandlerInput } from "./IEditorsPicksHandlerInput";
import { IMostReadGridHandlerInput } from "./IMostReadGridHandlerInput";
import { IMostReadHandlerInput } from "./IMostReadHandlerInput";

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
  | ITopStoriesV2DefaultHandlerInput
  | ITopStoriesV2DefaultGridHandlerInput
  | IBiggieSmallsHandlerInput
  | IBiggieSmallsGridHandlerInput
  | IBiggieSmallsV2HandlerInput
  | IBiggieSmallsV2GridHandlerInput
  | INewsSixHandlerInput
  | INewsSixGridHandlerInput
  | INewsSixV2HandlerInput
  | INewsSixGridV2HandlerInput
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
  | IHalfFourGridHandlerInput
  | IVersionSwitcherHandlerInput
  | ILatestHeadlinesHandlerInput
  | IPartnerHandlerInput
  | IPlayStuffHandlerInput
  | IEditorsPicksHandlerInput
  | IEditorsPicksGridHandlerInput
  | IPlayStuffHandlerInput
  | IMostReadGridHandlerInput
  | IMostReadHandlerInput;
