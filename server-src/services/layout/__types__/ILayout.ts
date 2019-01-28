import { IRawArticle } from '../../__types__/IRawArticle';
import { IContentBlock } from '../../__types__/IContentBlock';

export type ILayout = (articleList: IRawArticle[]) => IContentBlock[];
