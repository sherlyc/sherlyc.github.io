import { IJsonFeedArticle } from './IJsonFeedArticle';

export interface IEditorsPick {
  [key: string]: any;
  assets: IJsonFeedArticle[];
}
