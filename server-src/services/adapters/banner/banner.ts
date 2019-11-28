import config from '../../utils/config';
import retry from '../../utils/retry';
import cacheHttp from '../../utils/cache-http';
import { IParams } from '../../__types__/IParams';
import { IBannerResponse } from '../__types__/IBannerResponse';

async function apiCall(params: IParams): Promise<IBannerResponse[]> {
  const response = await cacheHttp(params, config.bannerApi);
  return response.data;
}

export default (params: IParams) => retry(() => apiCall(params), params);
