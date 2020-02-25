import { IRawArticle } from "../__types__/IRawArticle";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";
import { getArticleById } from "../jsonfeed/jsonfeed";
import wrappedLogger from "../../utils/logger";

interface IMostPopularResponse {
  mostPopular: {
    mostPopularArticles: Array<{ id: string }>;
    error: boolean;
  };
}

export const getMostPopular = async (
  limit: number,
  params: IParams,
  days: number = 2
): Promise<IRawArticle[]> => {
  try {
    const response = await cacheHttp<IMostPopularResponse>(
      params,
      config.mostPopularApi
    );
    return await Promise.all(
      response.data.mostPopular.mostPopularArticles.map(({ id }) =>
        getArticleById(params, parseInt(id, 10))
      )
    );
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      "Most popular service level error",
      error
    );
    return [];
  }
};
