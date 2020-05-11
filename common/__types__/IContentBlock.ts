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
import { IModuleSubtitle } from "./IModuleSubtitle";
import { IResponsiveBigImageArticleUnit } from "./IResponsiveBigImageArticleUnit";
import { IWeatherUnit } from "./IWeatherUnit";
import { IStickyContainer } from "./IStickyContainer";
import { IBulletList } from "./IBulletList";
import { IResponsiveExternalContent } from "./IResponsiveExternalContent";
import { IArticleTitle } from "./IArticleTitle";
import { IOli } from "./IOli";

export type IContentBlock =
  | IDefconArticleUnit
  | IGrayDefconArticleUnit
  | IBasicArticleUnit
  | IBasicArticleTitleUnit
  | IBigImageArticleUnit
  | IHalfWidthImageArticleUnit
  | IBasicArticleSection
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
  | IGridContainer
  | IResponsiveBigImageArticleUnit
  | IModuleTitle
  | IModuleSubtitle
  | IFeaturedArticle
  | IStickyContainer
  | IBulletList
  | IResponsiveExternalContent
  | IArticleTitle
  | IOli;
