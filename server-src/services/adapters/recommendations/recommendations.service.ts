import { IParams } from '../../__types__/IParams';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRecommendationsResponse } from '../__types__/IRecommendationsResponse';

const { segments, maxCount } = config.recommendationsCookie;
const { url, limit } = config.recommendationsApi;

export const parseCookie = (keys: string[], count: number) => (
  cookie: string
): string => {
  const pattern = new RegExp(`(${keys.join('|')})=([^;]+)`, 'g');
  const counter = keys.reduce<{ [key: string]: number }>((acc, curr) => {
    acc[curr] = 0;
    return acc;
  }, {});
  const result = [];
  let matches;
  while ((matches = pattern.exec(cookie))) {
    const [pair, key] = matches;
    if (counter[key] < count) {
      counter[key]++;
      result.push(pair);
    }
  }
  return result.join(';');
};

const parseCookieWithConfig = parseCookie(segments, maxCount);

export const getRecommendedArticles = async (
  cookie: string,
  spadeParams: IParams
): Promise<IRecommendationsResponse> => {
  const segment = parseCookieWithConfig(cookie);
  const encodedSegment = encodeURIComponent(segment);
  const { data: ids } = await cacheHttp<IRecommendationsResponse>(
    spadeParams,
    `${url}?segment=${encodedSegment}&limit=${limit}`
  );
  return ids;
};
