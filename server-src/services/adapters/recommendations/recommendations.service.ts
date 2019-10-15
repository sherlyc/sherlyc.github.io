import { IParams } from '../../__types__/IParams';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRawArticle } from '../__types__/IRawArticle';
import { getArticleById } from '../jsonfeed';

const { url, limit } = config.recommendationsApi;
type ArticleId = number;

export const getRecommendedArticles = async (
  segments: string,
  spadeParams: IParams
): Promise<IRawArticle[]> => {
  const encodedSegment = encodeURIComponent(segments);
  const response = await cacheHttp<ArticleId[]>(
    spadeParams,
    `${url}?segment=${encodedSegment}&limit=${limit}`
  );

  return Promise.all(
    response.data.map((id) => getArticleById(spadeParams, id))
  );
};
