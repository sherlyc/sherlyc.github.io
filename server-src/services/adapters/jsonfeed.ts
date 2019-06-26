import { retrieveArticleList, retrieveListAsset } from './jsonfeed-retriever';
import mapToRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
import { ListAsset } from '../listAsset';
import config from '../utils/config';
import logger from '../utils/logger';

const warnIfMissingImages = (articles: IRawArticle[], params: IParams) => {
  articles.forEach((article) => {
    if (!article.imageSrc || !article.imageSrcSet) {
      logger.warn(
        params.apiRequestId,
        `Image is missing for article id - ${article.id}
       (imageSrc = ${article.imageSrc}. imageSrcSet = ${article.imageSrcSet})`
      );
    }
  });
};

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
  const articles = mapToRawArticleList(jsonFeed.stories);
  warnIfMissingImages(articles, params);
  return articles;
};

const listAssetRegistry: { [key in ListAsset]: Function } = {
  [ListAsset.EditorPicks]: retrieveListAsset(config.editorsPickAssetId),
  [ListAsset.MidStrip]: retrieveListAsset(config.midStripListAssetId),
  [ListAsset.MiniMidStrip]: retrieveListAsset(config.miniMidStripListAssetId),
  [ListAsset.DailyFix]: retrieveListAsset(config.dailyFixAssetId),
  [ListAsset.TopStories]: retrieveListAsset(config.topStoriesListAssetId)
};

export const getListAsset = async (
  params: IParams,
  listAssetId: ListAsset,
  total: number = 0
): Promise<IRawArticle[]> => {
  const articles = await listAssetRegistry[listAssetId](params, total);
  const listAssetArticles = mapToRawArticleList(articles.assets);
  warnIfMissingImages(listAssetArticles, params);
  return listAssetArticles;
};
