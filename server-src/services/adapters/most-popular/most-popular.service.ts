import { IRawArticle } from "../__types__/IRawArticle";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import { getArticleById } from "../jsonfeed/jsonfeed";
import wrappedLogger from "../../utils/logger";

interface MostPopularResponse {
  stories: Array<{
    storyId: string;
    [key: string]: any;
  }>;
}

export const getMostPopular = async (
  limit: number,
  params: IParams
): Promise<IRawArticle[]> => {
  try {
    const response = await cacheHttp<MostPopularResponse>(
      params,
      `${config.mostPopularApi}?days=2&limit=${limit}`
    );
    return await Promise.all(
      response.data.stories.map(({ storyId }) =>
        getArticleById(params, parseInt(storyId, 10))
      )
    );
  } catch (error) {
    wrappedLogger.warn(
      params.apiRequestId,
      "Most popular service level error",
      error
    );
    return [];
  }
};
