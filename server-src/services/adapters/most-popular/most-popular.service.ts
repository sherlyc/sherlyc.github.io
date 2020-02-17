import { IRawArticle } from "../__types__/IRawArticle";
import { IParams } from "../../__types__/IParams";
import cacheHttp from "../../utils/cache-http";
import config from "../../utils/config";

export const getMostPopular = async (
  limit: number,
  params: IParams
): Promise<IRawArticle[]> => {
  await cacheHttp(params, `${config.mostPopularApi}?limit=${limit}`);
  return [];
};
