import retrieveJsonFeed from './jsonfeed-retriever';
import mapToIRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';

export default async (
  limit: number,
  section?: string
): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveJsonFeed(limit, section);
  return mapToIRawArticleList(jsonFeed);
};
