import { ISectionLayout, ILayout } from './__types__/ISectionLayout';
import config from '../utils/config';
import http from '../utils/http';
import retry from '../utils/retry';
import { IParams } from '../__types__/IParams';
import { LayoutType } from './__types__/LayoutType';
import { AxiosResponse } from 'axios';
import logger from '../utils/logger';

const isValid = (response: AxiosResponse<ISectionLayout>) => {
  if (
    response.status !== 200 ||
    !response.data ||
    !response.data.layouts ||
    !response.data.layouts[0]
  ) {
    return false;
  }
  return true;
};

const mapTopStoriesLayout = (data: ISectionLayout) => {
  const topStoriesLayout = data.layouts[0].layout;
  if (topStoriesLayout.includes('defcon')) {
    return LayoutType.DEFCON;
  }
  return LayoutType.DEFAULT;
};

async function requestTopStoriesLayout(params: IParams): Promise<LayoutType> {
  const response = await http(params).get<ISectionLayout>(config.layoutAPI);

  if (!isValid(response)) {
    logger.error(params.apiRequestId, 'Failed to fetch layout');
    return LayoutType.DEFAULT;
  }

  return mapTopStoriesLayout(response.data);
}

export const layoutRetriever = (params: IParams) =>
  retry(() => requestTopStoriesLayout(params), params);
