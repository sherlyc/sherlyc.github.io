import { IContentBlock } from '../interfaces/content-blocks/IContentBlock';
import getRawArticleList from './content-source/jsonFeed';
import contentLogic from './content-logic/contentLogic';
import generate from './layout/layoutGenerator';
import { IRawArticle } from '../interfaces/IRawArticle';
import { IErrorBlock } from '../interfaces/content-blocks/IErrorBlock';

export default async (): Promise<IContentBlock[]> => {
  try {
    const articleList: IRawArticle[] = await getRawArticleList();
    return generate(contentLogic(articleList));
  } catch (e) {
    return [{ type: 'ErrorBlock', message: e.message } as IErrorBlock];
  }
};
