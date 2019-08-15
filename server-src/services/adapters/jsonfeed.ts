import { retrieveSectionList, retrieveListAsset } from './jsonfeed-retriever';
import mapToRawArticleList from './jsonfeed-mapper';
import { IJsonFeedArticleList } from './__types__/IJsonFeedArticleList';
import { IRawArticle } from './__types__/IRawArticle';
import { Section } from '../section';
import { IParams } from '../__types__/IParams';
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

export const getSectionArticleList = async (
  section: Section,
  total: number,
  params: IParams
): Promise<IRawArticle[]> => {
  const jsonFeed: IJsonFeedArticleList = await retrieveSectionList(
    section,
    total,
    params
  );
  const articles = mapToRawArticleList(jsonFeed.stories);
  warnIfMissingImages(articles, params);
  return articles;
};

export const getListAssetById = async (
  params: IParams,
  listAssetId: string,
  total: number = 0
): Promise<IRawArticle[]> => {
  const articles = await retrieveListAsset(listAssetId)(params, total);
  const listAssetArticles = mapToRawArticleList(articles.assets);
  warnIfMissingImages(listAssetArticles, params);
  return listAssetArticles;
};
