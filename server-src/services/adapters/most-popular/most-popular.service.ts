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
  params: IParams
): Promise<IRawArticle[]> => {
  try {
    const response = await cacheHttp<IMostPopularResponse>(
      params,
      config.mostPopularApi
    );
    if (response.data.mostPopular.error) {
      throw Error("Most popular returns error");
    }
    const articleIds = response.data.mostPopular.mostPopularArticles.slice(
      0,
      limit
    );

    return await Promise.all(
      articleIds.map(({ id }) => getArticleById(params, parseInt(id, 10)))
    );
  } catch (error) {
    wrappedLogger.error(
      params.apiRequestId,
      "Most popular service level error",
      error
    );
    throw error;
  }
};
