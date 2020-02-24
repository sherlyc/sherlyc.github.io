import { AxiosResponse } from "axios";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import logger from "../../utils/logger";
import retry from "../../utils/retry";
import { ISectionLayout } from "../__types__/ISectionLayout";
import { LayoutType } from "../__types__/LayoutType";

const isValid = (response: AxiosResponse<ISectionLayout>) => {
  if (!response.data || !response.data.layouts || !response.data.layouts[0]) {
    return false;
  }
  return true;
};

const mapTopStoriesLayout = (data: ISectionLayout) => {
  const topStoriesLayout = data.layouts[0].layout;
  if (topStoriesLayout.includes("defcon")) {
    return LayoutType.DEFCON;
  } else if (topStoriesLayout.includes("big_headline")) {
    return LayoutType.BIG_HEADLINE;
  }
  return LayoutType.DEFAULT;
};

async function requestTopStoriesLayout(params: IParams): Promise<LayoutType> {
  return LayoutType.DEFCON;
  const response = await cacheHttp(params, config.layoutAPI);

  if (!isValid(response)) {
    logger.error(
      params.apiRequestId,
      `Layout API - Failed to fetch layout - Status: ${response.status} Data: ${response.data}`
    );
    return LayoutType.DEFAULT;
  }

  return mapTopStoriesLayout(response.data);
}

export const layoutRetriever = (params: IParams) =>
  retry(() => requestTopStoriesLayout(params), params);
