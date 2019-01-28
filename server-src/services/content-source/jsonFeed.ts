import retrieveJsonFeed from './jsonFeed.retriever';
import mapToIRawArticleList from './jsonFeed.mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from '../__types__/IRawArticle';

export default async (): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveJsonFeed();
  return mapToIRawArticleList(jsonFeed);
};
