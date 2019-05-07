import { IJsonFeedArticle } from './IJsonFeedArticle';

export interface IMidStrip {
  [key: string]: any;
  assets: IJsonFeedArticle[];
}
