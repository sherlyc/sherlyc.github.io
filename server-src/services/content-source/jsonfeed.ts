import retrieveJsonFeed from './jsonfeed-retriever';
import mapToIRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from '../__types__/IRawArticle';
import { Section } from './section';

export default async (): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveJsonFeed(
    Section.latest,
    6
  );
  return mapToIRawArticleList(jsonFeed);
};
