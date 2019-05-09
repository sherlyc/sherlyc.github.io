import { IJsonFeedArticle } from './IJsonFeedArticle';

export interface IListAsset {
  [key: string]: any;
  assets: IJsonFeedArticle[];
}
