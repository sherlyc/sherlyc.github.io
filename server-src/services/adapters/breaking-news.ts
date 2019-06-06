import config from '../utils/config';
import { IBreakingNewsResponse } from './__types__/IBreakingNewsResponse';
import retry from '../utils/retry';
import http from '../utils/http';
import { IParams } from '../__types__/IParams';
import { ISicsApiBreakingNews } from './__types__/ISicsApiBreakingNews';

async function apiCall(params: IParams): Promise<IBreakingNewsResponse> {
  const response = await http(params).get<ISicsApiBreakingNews>(
    `${config.breakingNewsApi}`
  );
  return response.data.breakingNews.breakingNewsData;
}

export default (params: IParams) => retry(() => apiCall(params), params);
