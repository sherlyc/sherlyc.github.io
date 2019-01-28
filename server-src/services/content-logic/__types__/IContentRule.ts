import { IRawArticle } from '../../__types__/IRawArticle';

export type IContentRule = (articleList: IRawArticle[]) => IRawArticle[];
