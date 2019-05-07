import retrieveJsonFeed, { retrieveMidStrip } from './jsonfeed-retriever';
import mapToIRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { IMidStrip } from './__types__/IMidStrip';

export default async (
  section: Section,
  total: number,
  params: IParams
): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveJsonFeed(
    section,
    total,
    params
  );
  return mapToIRawArticleList(jsonFeed.stories);
};

export const getMidStrip = async (
  total: number,
  params: IParams
): Promise<IRawArticle[]> => {
  const midStripJsonFeed: IMidStrip = await retrieveMidStrip(total, params);
  return mapToIRawArticleList(midStripJsonFeed.assets);
};
