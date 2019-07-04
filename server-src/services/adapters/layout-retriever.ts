import { ISectionLayout } from './__types__/ISectionLayout';
import config from '../utils/config';
import http from '../utils/http';
import retry from '../utils/retry';
import { IParams } from '../__types__/IParams';
import { LayoutType } from './__types__/LayoutType';
import { AxiosResponse } from 'axios';
import logger from '../utils/logger';

const validateResponse = (
  response: AxiosResponse<ISectionLayout>,
  params: IParams
) => {
  if (response.status !== 200) {
    logger.error(params.apiRequestId, 'Failed to fetch layout');
  }
};

const mapToLayoutType = (response: ISectionLayout) => {
  const topStoriesLayout =
    (response && response.layouts[0] && response.layouts[0].layout) || '';
  if (topStoriesLayout.includes('defcon')) {
    return LayoutType.DEFCON;
  }
  return LayoutType.DEFAULT;
};

async function requestTopStoriesLayout(params: IParams): Promise<LayoutType> {
  const response = await http(params).get<ISectionLayout>(config.layoutAPI);
  validateResponse(response, params);
  return mapToLayoutType(response.data);
}

export const layoutRetriever = (params: IParams) =>
  retry(() => requestTopStoriesLayout(params), params);
