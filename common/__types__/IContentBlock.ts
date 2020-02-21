import { IBasicAdUnit } from "./IBasicAdUnit";
import { IBasicArticleSection } from "./IBasicArticleSection";
import { IBasicArticleTitleUnit } from "./IBasicArticleTitleUnit";
import { IBasicArticleUnit } from "./IBasicArticleUnit";
import { IBigImageArticleUnit } from "./IBigImageArticleUnit";
import { IBreakingNews } from "./IBreakingNews";
import { IColumnContainer } from "./IColumnContainer";
import { IContainer } from "./IContainer";
import { IDefconArticleUnit } from "./IDefconArticleUnit";
import { IErrorBlock } from "./IErrorBlock";
import { IExpandableArticleSection } from "./IExpandableArticleSection";
import { IExperimentContainer } from "./IExperimentContainer";
import { IExternalContentUnit } from "./IExternalContentUnit";
import { IFeatureContainer } from "./IFeatureContainer";
import { IFeaturedArticle } from "./IFeaturedArticle";
import { IFooter } from "./IFooter";
import { IGrayDefconArticleUnit } from "./IGrayDefconArticleUnit";
import { IGridContainer } from "./IGridContainer";
import { IHalfImageArticleWithoutIntroUnit } from "./IHalfImageArticleWithoutIntroUnit";
import { IHalfWidthImageArticleUnit } from "./IHalfWidthImageArticleUnit";
import { IHeader } from "./IHeader";
import { IImageLinkUnit } from "./IImageLinkUnit";
import { IModuleTitle } from "./IModuleTitle";
import { IRecommendations } from "./IRecommendations";
import { IResponsiveBigImageArticleUnit } from "./IResponsiveBigImageArticleUnit";
import { IWeatherUnit } from "./IWeatherUnit";
import { IStickyContainer } from "./IStickyContainer";
import { IBulletList } from "./IBulletList";
import { IResponsiveExternalContent } from "./IResponsiveExternalContent";

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
  | IHalfImageArticleWithoutIntroUnit
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
  | IFeaturedArticle
  | IStickyContainer
  | IBulletList
  | IResponsiveExternalContent;
