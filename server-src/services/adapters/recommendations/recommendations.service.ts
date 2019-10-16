import { IParams } from '../../__types__/IParams';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRawArticle } from '../__types__/IRawArticle';
import { getArticleById } from '../jsonfeed';
import logger from '../../utils/logger';

const { url, limit } = config.recommendationsApi;
type ArticleId = number;

export const getRecommendedArticles = async (
  segment: string,
  spadeParams: IParams
): Promise<IRawArticle[]> => {
  const encodedSegment = encodeURIComponent(segment);

  try {
    const response = await cacheHttp<ArticleId[]>(
      spadeParams,
      `${url}?segment=${encodedSegment}&limit=${limit}`
    );

    return await Promise.all(
      response.data.map((id) => getArticleById(spadeParams, id))
    );
  } catch (error) {
    logger.warn(spadeParams.apiRequestId, `getRecommendedArticles - ${error}`);
    return [];
  }
};
