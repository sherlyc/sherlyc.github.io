import retry from '../utils/retry';
import cacheHttp from '../utils/cache-http';
import { IParams } from '../__types__/IParams';

async function apiCall(params: IParams): Promise<any> {
  const response = await cacheHttp(params, 'https://assets.stuff.co.nz/static/spade/banner.json');
  return response.data;
}

export default (params: IParams) => retry(() => apiCall(params), params);
