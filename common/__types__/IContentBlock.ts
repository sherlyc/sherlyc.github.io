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

export type IContentBlock =
  | IBasicArticleUnit
  | IBasicArticleSection
  | IImageLinkUnit
  | IBasicAdUnit
  | IErrorBlock
  | IContainer
  | IColumnContainer
  | IBreakingNews
  | IFooter
  | IExternalContentUnit
  | IHeader;
