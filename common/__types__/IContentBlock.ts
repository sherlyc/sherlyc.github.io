import { IDefconArticleUnit } from "./IDefconArticleUnit";
import { IBasicArticleUnit } from "./IBasicArticleUnit";
import { IErrorBlock } from "./IErrorBlock";
import { IContainer } from "./IContainer";
import { IFooter } from "./IFooter";
import { IHeader } from "./IHeader";
import { IBasicAdUnit } from "./IBasicAdUnit";
import { IBasicArticleSection } from "./IBasicArticleSection";
import { IBreakingNews } from "./IBreakingNews";
import { IImageLinkUnit } from "./IImageLinkUnit";
import { IColumnContainer } from "./IColumnContainer";
import { IExternalContentUnit } from "./IExternalContentUnit";
import { IWeatherUnit } from "./IWeatherUnit";
import { IBasicArticleTitleUnit } from "./IBasicArticleTitleUnit";
import { IExperimentContainer } from "./IExperimentContainer";
import { IFeatureContainer } from "./IFeatureContainer";
import { IGrayDefconArticleUnit } from "./IGrayDefconArticleUnit";
import { IBigImageArticleUnit } from "./IBigImageArticleUnit";
import { IHalfWidthImageArticleUnit } from "./IHalfWidthImageArticleUnit";
import { IExpandableArticleSection } from "./IExpandableArticleSection";
import { IRecommendations } from "./IRecommendations";
import { IGridContainer } from "./IGridContainer";
import { IResponsiveBigImageArticleUnit } from "./IResponsiveBigImageArticleUnit";
import { IModuleTitle } from "./IModuleTitle";
import { IListContainer } from "./IListContainer";

export type IContentBlock =
  | IDefconArticleUnit
  | IGrayDefconArticleUnit
  | IBasicArticleUnit
  | IBasicArticleTitleUnit
  | IBigImageArticleUnit
  | IHalfWidthImageArticleUnit
  | IBasicArticleSection
  | IExpandableArticleSection
  | IImageLinkUnit
  | IBasicAdUnit
  | IErrorBlock
  | IContainer
  | IColumnContainer
  | IBreakingNews
  | IFooter
  | IExternalContentUnit
  | IHeader
  | IWeatherUnit
  | IExperimentContainer
  | IFeatureContainer
  | IRecommendations
  | IGridContainer
  | IResponsiveBigImageArticleUnit
  | IModuleTitle
  | IListContainer;
