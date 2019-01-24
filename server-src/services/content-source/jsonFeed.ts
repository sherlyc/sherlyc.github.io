import retrieveJsonFeed from './jsonFeed.retriever';
import mapToIRawArticleList from './jsonFeed.mapper';
import { IJsonFeedArticleList } from '../../interfaces/IJsonFeedArticleList';
import { IRawArticle } from '../../interfaces/IRawArticle';

export default async (): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveJsonFeed();
  return mapToIRawArticleList(jsonFeed);
};
