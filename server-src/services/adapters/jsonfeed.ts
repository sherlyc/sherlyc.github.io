import {
  retrieveMidStrip,
  retrieveArticleList,
  retrieveMiniMidStrip,
  retrieveEditorsPick
} from './jsonfeed-retriever';
import mapToIRawArticleList from './jsonfeed-mapper';
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
  const jsonFeed: IJsonFeedArticleList = await retrieveArticleList(
    section,
    total,
    params
  );
  return mapToIRawArticleList(jsonFeed.stories);
};

export const getListAsset = async (
  params: IParams,
  listAssetId: ListAsset,
  total: number = 0
): Promise<IRawArticle[]> => {
  let articles;
  switch (listAssetId) {
    case ListAsset.EditorPicks:
      articles = await retrieveEditorsPick(params);
      break;
    case ListAsset.MidStrip:
      articles = await retrieveMidStrip(total, params);
      break;
    case ListAsset.MiniMidStrip:
      articles = await retrieveMiniMidStrip(params);
      break;
    default:
      articles = { assets: [] };
  }
  return mapToIRawArticleList(articles.assets);
};
