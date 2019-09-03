import { ContentBlockType } from './ContentBlockType';
import { HeadlineFlags } from '../HeadlineFlags';
import { IArticle } from './IArticle';

export interface IHalfWidthImageArticleUnit extends IArticle {
  type: ContentBlockType.HalfWidthImageArticleUnit;
}
