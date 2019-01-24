import { IRawArticle } from '../IRawArticle';
import { IContentBlock } from './IContentBlock';

export type ILayout = (articleList: IRawArticle[]) => IContentBlock[];
