import { IBasicArticleUnit } from './IBasicArticleUnit';
import { IErrorBlock } from './IErrorBlock';
import { IContainer } from './IContainer';
import { IFooter } from './IFooter';
import { IHeader } from './IHeader';
import { IBasicAdUnit } from './IBasicAdUnit';
import { IBasicArticleSection } from './IBasicArticleSection';

export type IContentBlock =
  | IBasicArticleUnit
  | IBasicArticleSection
  | IBasicAdUnit
  | IErrorBlock
  | IContainer
  | IFooter
  | IHeader;
