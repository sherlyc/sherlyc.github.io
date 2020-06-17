import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import retry from "../../utils/retry";
import { IParams } from "../../__types__/IParams";
import { IBreakingNewsResponse } from "../__types__/IBreakingNewsResponse";

async function apiCall(params: IParams): Promise<IBreakingNewsResponse> {
  const response = await cacheHttp(params, config.breakingNewsApi);
  return response.data.breakingNews.breakingNewsData;
}

export default (params: IParams) => retry(() => apiCall(params), params);
