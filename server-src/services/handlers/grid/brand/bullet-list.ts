import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { bulletItem } from "../../../adapters/article-converter/bullet-item.converter";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { IRawArticle } from "../../../adapters/__types__/IRawArticle";
import wrappedLogger from "../../../utils/logger";
import { IParams } from "../../../__types__/IParams";
import { IBrandListConfig } from "../../__types__/IBrandConfig";

export const createBulletList = async (
  config: IBrandListConfig,
  articlesPerBrand: number,
  params: IParams
): Promise<IBulletList> => {
  const { sourceId, logo, logoLink, bulletColor } = config;

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
    logoLink,
    items: bulletItems
  };
};
