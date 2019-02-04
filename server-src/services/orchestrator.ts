import { IContentBlock } from '../../common/__types__/IContentBlock';
import getRawArticleList from './content-source/jsonFeed';
import contentLogic from './content-logic/contentLogic';
import generate from './layout/layoutGenerator';
import { IRawArticle } from './__types__/IRawArticle';
import { IErrorBlock } from '../../common/__types__/IErrorBlock';

export default async (): Promise<IContentBlock[]> => {
  try {
    const articleList: IRawArticle[] = await getRawArticleList();
    return generate(contentLogic(articleList));
  } catch (e) {
    return [{ type: 'ErrorBlock', message: e.message } as IErrorBlock];
  }
};
