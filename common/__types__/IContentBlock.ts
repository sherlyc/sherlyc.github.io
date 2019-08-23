import { IDefconArticleUnit } from './IDefconArticleUnit';
import { IBasicArticleUnit } from './IBasicArticleUnit';
import { IErrorBlock } from './IErrorBlock';
import { IContainer } from './IContainer';
import { IFooter } from './IFooter';
import { IHeader } from './IHeader';
import { IBasicAdUnit } from './IBasicAdUnit';
import { IBasicArticleSection } from './IBasicArticleSection';
import { IBreakingNews } from './IBreakingNews';
import { IImageLinkUnit } from './IImageLinkUnit';
import { IColumnContainer } from './IColumnContainer';
import { IExternalContentUnit } from './IExternalContentUnit';
import { IWeatherUnit } from './IWeatherUnit';
import { IBasicArticleTitleUnit } from './IBasicArticleTitleUnit';
import { IExperimentContainer } from './IExperimentContainer';
import { IFeatureContainer } from './IFeatureContainer';

export type IContentBlock =
  | IDefconArticleUnit
  | IBasicArticleUnit
  | IBasicArticleTitleUnit
  | IBasicArticleSection
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
  | IFeatureContainer;
