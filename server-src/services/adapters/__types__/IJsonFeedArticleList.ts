import { IJsonFeedArticle } from './IJsonFeedArticle';
import { IJsonFeedUrl } from './IJsonFeedUrl';
import { IJsonFeedQuery } from './IJsonFeedQuery';

export interface IJsonFeedArticleList {
  [key: string]: any;
  stories: Array<IJsonFeedArticle | IJsonFeedUrl | IJsonFeedQuery>;
}
