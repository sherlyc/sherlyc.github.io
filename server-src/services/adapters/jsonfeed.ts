import { retrieveArticleList, retrieveListAsset } from './jsonfeed-retriever';
import mapToRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { ListAsset } from '../listAsset';
import config from '../utils/config';

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
  return mapToRawArticleList(jsonFeed.stories);
};

const listAssetRegistry: { [key in ListAsset]: Function } = {
  [ListAsset.EditorPicks]: retrieveListAsset(config.editorsPickAssetId),
  [ListAsset.MidStrip]: retrieveListAsset(config.midStripListAssetId),
  [ListAsset.MiniMidStrip]: retrieveListAsset(config.miniMidStripListAssetId),
  [ListAsset.DailyFix]: retrieveListAsset(config.dailyFixAssetId)
};

export const getListAsset = async (
  params: IParams,
  listAssetId: ListAsset,
  total: number = 0
): Promise<IRawArticle[]> => {
  const articles = await listAssetRegistry[listAssetId](params, total);
  return mapToRawArticleList(articles.assets);
};
