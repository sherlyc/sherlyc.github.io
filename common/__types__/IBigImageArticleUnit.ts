import { ContentBlockType } from './ContentBlockType';
import { HeadlineFlags } from '../HeadlineFlags';
import { IArticle } from './IArticle';

export interface IBigImageArticleUnit extends IArticle {
  type: ContentBlockType.BigImageArticleUnit;
}
