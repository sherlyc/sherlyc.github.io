import { IRawArticle } from './IRawArticle';

export type IContentRule = (articleList: IRawArticle[]) => IRawArticle[];
