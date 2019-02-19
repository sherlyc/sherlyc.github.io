import { IBasicArticleUnit } from './IBasicArticleUnit';

export interface IBasicArticleSection {
  type: 'BasicArticleSection';
  name: string;
  linkUrl: string;
  articles: IBasicArticleUnit[];
}
