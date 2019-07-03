import { ILayout } from './__types__/ILayout';
import config from '../utils/config';
import http from '../utils/http';
import retry from '../utils/retry';
import { IParams } from '../__types__/IParams';

async function requestTopStoriesLayout(params: IParams): Promise<ILayout> {
  const response = await http(params).get<ILayout>(config.layoutAPI);
  if (response.status !== 200) {
    throw new Error('Failed to fetch layout');
  }
  return response.data;
}

export const layoutRetriever = (params: IParams) =>
  retry(() => requestTopStoriesLayout(params), params);
