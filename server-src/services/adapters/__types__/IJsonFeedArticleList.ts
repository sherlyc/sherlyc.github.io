import { IJsonFeedArticle } from "./IJsonFeedArticle";
import { IJsonFeedQuery } from "./IJsonFeedQuery";
import { IJsonFeedUrl } from "./IJsonFeedUrl";

export interface IJsonFeedArticleList {
  [key: string]: any;
  stories: Array<IJsonFeedArticle | IJsonFeedUrl | IJsonFeedQuery>;
}
