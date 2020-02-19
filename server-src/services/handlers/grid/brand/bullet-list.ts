import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { IParams } from "../../../__types__/IParams";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { bulletItem } from "../../../adapters/article-converter/bullet-item.converter";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import wrappedLogger from "../../../utils/logger";

export const createBulletList = async (
  config: IBrandListConfig,
  articlesPerBrand: number,
  params: IParams
): Promise<IBulletList> => {
  const { sourceId, logo, bulletColor } = config;

  let articles: IRawArticle[] = [];
  try {
    articles = await getRawArticles(sourceId, articlesPerBrand, params);
  } catch (error) {
    wrappedLogger.warn(
      params.apiRequestId,
      `Brand Handler - failed to retrieve articles for sourceId: ${sourceId} | logo: ${logo}`,
      error
    );
  }

  const bulletItems = articles.map((article: IRawArticle) =>
    bulletItem(article, sourceId, bulletColor)
  );

  return {
    type: ContentBlockType.BulletList,
    logo,
    items: bulletItems
  };
};
