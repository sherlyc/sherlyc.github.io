import { IBasicArticleUnit } from './IBasicArticleUnit';
import { IErrorBlock } from './IErrorBlock';
import { IContainer } from './IContainer';
import { IFooter } from './IFooter';
import { IHeader } from './IHeader';

export type IContentBlock =
  | IBasicArticleUnit
  | IErrorBlock
  | IContainer
  | IFooter
  | IHeader;
