import { IBasicArticleUnit } from './IBasicArticleUnit';
import { IErrorBlock } from './IErrorBlock';
import { IContainer } from './IContainer';
import { IFooter } from './IFooter';
import { IHeader } from './IHeader';
import { IBasicAdUnit } from './IBasicAdUnit';

export type IContentBlock =
  | IBasicArticleUnit
  | IBasicAdUnit
  | IErrorBlock
  | IContainer
  | IFooter
  | IHeader;
