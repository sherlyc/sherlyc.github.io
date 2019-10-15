import { IParams } from '../../__types__/IParams';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRecommendationsResponse } from '../__types__/IRecommendationsResponse';

const { url, limit } = config.recommendationsApi;

export const getRecommendedArticles = async (
  segments: string,
  spadeParams: IParams
): Promise<IRecommendationsResponse> => {
  const encodedSegment = encodeURIComponent(segments);
  const { data: ids } = await cacheHttp<IRecommendationsResponse>(
    spadeParams,
    `${url}?segment=${encodedSegment}&limit=${limit}`
  );
  return ids;
};
