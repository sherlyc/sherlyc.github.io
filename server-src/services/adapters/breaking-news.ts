import config from '../utils/config';
import { IBreakingNewsResponse } from './__types__/IBreakingNewsResponse';
import retry from '../utils/retry';
import http from '../utils/http';
import { IParams } from '../__types__/IParams';
import { IIsomophicApiBreakingNews } from './__types__/IIsomophicApiBreakingNews';

async function apiCall(params: IParams): Promise<IBreakingNewsResponse> {
  const response = await http(params).get<IIsomophicApiBreakingNews>(
    config.breakingNewsApi
  );
  return response.data.breakingNews.breakingNewsData;
}

export default (params: IParams) => retry(() => apiCall(params), params);
