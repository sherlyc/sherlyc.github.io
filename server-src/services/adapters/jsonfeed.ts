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
import { IListAsset } from './__types__/IListAsset';

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
  const midStripJsonFeed: IListAsset = await retrieveMidStrip(total, params);
  return mapToIRawArticleList(midStripJsonFeed.assets);
};

export const getMiniMidStrip = async (
  params: IParams
): Promise<IRawArticle[]> => {
  const miniMidStripJsonFeed: IListAsset = await retrieveMiniMidStrip(params);
  return mapToIRawArticleList(miniMidStripJsonFeed.assets);
};

export const getEditorsPick = async (
  params: IParams
): Promise<IRawArticle[]> => {
  const editorsPick: IListAsset = await retrieveEditorsPick(params);
  return mapToIRawArticleList(editorsPick.assets);
};
