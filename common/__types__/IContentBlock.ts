import { IArticleTitle } from "./IArticleTitle";
import { IBasicAdUnit } from "./IBasicAdUnit";
import { IBasicArticleSection } from "./IBasicArticleSection";
import { IBasicArticleTitleUnit } from "./IBasicArticleTitleUnit";
import { IBasicArticleUnit } from "./IBasicArticleUnit";
import { IBigImageArticleUnit } from "./IBigImageArticleUnit";
import { IBreakingNews } from "./IBreakingNews";
import { IBulletList } from "./IBulletList";
import { IColumnContainer } from "./IColumnContainer";
import { IContainer } from "./IContainer";
import { IDefcon } from "./IDefcon";
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
import { IHomepageArticle } from "./IHomepageArticle";
import { IHomepageHighlightArticle } from "./IHomepageHighlightArticle";
import { IImageLinkUnit } from "./IImageLinkUnit";
import { IModuleHeader } from "./IModuleHeader";
import { IModuleSubtitle } from "./IModuleSubtitle";
import { IModuleTitle } from "./IModuleTitle";
import { IMostReadList } from "./IMostReadList";
import { IOli } from "./IOli";
import { IOpinion } from "./IOpinion";
import { IPartnerContent } from "./IPartnerContent";
import { IPlayStuff } from "./IPlayStuff";
import { IResponsiveBigImageArticleUnit } from "./IResponsiveBigImageArticleUnit";
import { IResponsiveExternalContent } from "./IResponsiveExternalContent";
import { IStickyContainer } from "./IStickyContainer";
import { IVerticalArticleList } from "./IVerticalArticleList";
import { IWeatherUnit } from "./IWeatherUnit";

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
  | IModuleHeader
  | IModuleTitle
  | IModuleSubtitle
  | IFeaturedArticle
  | IStickyContainer
  | IBulletList
  | IResponsiveExternalContent
  | IArticleTitle
  | IOli
  | IHomepageArticle
  | IHomepageHighlightArticle
  | IVerticalArticleList
  | IPartnerContent
  | IPlayStuff
  | IMostReadList
  | IDefcon
  | IOpinion;
