import retrieveJsonFeed from './jsonFeed.retriever';
import mapToIRawArticleList from './jsonFeed.mapper';
import { IJsonFeedArticleList } from '../../interfaces/IJsonFeedArticleList';

export default async () => {
  const jsonFeed: IJsonFeedArticleList = await retrieveJsonFeed();
  return mapToIRawArticleList(jsonFeed);
};
