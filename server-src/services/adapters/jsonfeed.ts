import {
  retrieveMidStrip,
  retrieveArticleList,
  retrieveMiniMidStrip,
  retrieveEditorsPick
} from './jsonfeed-retriever';
import mapToRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { ListAsset } from '../listAsset';

export const getArticleList = async (
  section: Section,
  total: number,
  params: IParams
): Promise<IRawArticle[]> => {
  try {
    const jsonFeed: IJsonFeedArticleList = await retrieveArticleList(
      section,
      total,
      params
    );
    return mapToRawArticleList(jsonFeed.stories);
  } catch (e) {
    return [];
  }
};

const listAssetRegistry: { [key in ListAsset]: Function } = {
  [ListAsset.EditorPicks]: retrieveEditorsPick,
  [ListAsset.MidStrip]: retrieveMidStrip,
  [ListAsset.MiniMidStrip]: retrieveMiniMidStrip
};

export const getListAsset = async (
  params: IParams,
  listAssetId: ListAsset,
  total: number = 0
): Promise<IRawArticle[]> => {
  try {
    const articles = await listAssetRegistry[listAssetId](params, total);
    return mapToRawArticleList(articles.assets);
  } catch (e) {
    return [];
  }
};
