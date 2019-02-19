import { IJsonFeedArticle } from './IJsonFeedArticle';

export interface IJsonFeedArticleList {
  [key: string]: any;
  stories: IJsonFeedArticle[];
}
