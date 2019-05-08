import {
  retrieveMidStrip,
  retrieveArticleList,
  retrieveMiniMidStrip
} from './jsonfeed-retriever';
import mapToIRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { IMidStrip } from './__types__/IMidStrip';

export const getArticleList = async (
  section: Section,
  total: number,
  params: IParams
): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveArticleList(
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

export const getMiniMidStrip = async (
  params: IParams
): Promise<IRawArticle[]> => {
  const miniMidStripJsonFeed: IMidStrip = await retrieveMiniMidStrip(params);
  return mapToIRawArticleList(miniMidStripJsonFeed.assets);
};
