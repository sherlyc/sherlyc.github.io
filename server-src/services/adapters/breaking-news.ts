import config from '../utils/config';
import { IBreakingNewsResponse } from './__types__/IBreakingNewsResponse';
import retry from '../utils/retry';
import cacheHttp from '../utils/cache-http';
import { IParams } from '../__types__/IParams';

async function apiCall(params: IParams): Promise<IBreakingNewsResponse> {
  const response = await cacheHttp(params, config.breakingNewsApi);
  return response.data.breakingNews.breakingNewsData;
}

export default (params: IParams) => retry(() => apiCall(params), params);
