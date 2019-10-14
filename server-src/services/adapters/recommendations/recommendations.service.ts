import { IParams } from '../../__types__/IParams';
import cacheHttp from '../../utils/cache-http';
import config from '../../utils/config';
import { IRecommendationsResponse } from '../__types__/IRecommendationsResponse';

export const parseCookie = (keys: string[], maxCount: number) => (
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
    if (counter[key] < maxCount) {
      counter[key]++;
      result.push(pair);
    }
  }
  return result.join(';');
};

export const getRecommendedArticles = async (
  cookie: string,
  spadeParams: IParams
): Promise<IRecommendationsResponse> => {
  const segment = parseCookie(['enth', 'rt', 'x'], 2)(cookie);
  const encodedSegment = encodeURIComponent(segment);
  const { data: ids } = await cacheHttp<IRecommendationsResponse>(
    spadeParams,
    `${config.recommendationsApi}?segment=${encodedSegment}&limit=5`
  );
  return ids;
};
