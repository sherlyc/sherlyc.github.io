import { IContentBlock } from '../interfaces/content-blocks/IContentBlock';
import getRawArticleList from './content-source/jsonFeed';
import contentLogic from './content-logic/contentLogic';
import generate from './layout/layoutGenerator';
import { IRawArticle } from '../interfaces/IRawArticle';

export default async (): Promise<IContentBlock[]> => {
  const articleList: IRawArticle[] = await getRawArticleList();
  return generate(contentLogic(articleList));
};
