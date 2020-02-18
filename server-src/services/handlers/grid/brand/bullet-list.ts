import { IBrandConfig } from "../../__types__/INetworkBrandConfig";
import { IParams } from "../../../__types__/IParams";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { contentErrorHandler } from "../content-error-handler";
import { bulletItem } from "../../../adapters/article-converter/bullet-item.converter";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";

export const createBulletList = async (
  config: IBrandConfig,
  articlesPerBrand: number,
  params: IParams
): Promise<IBulletList> => {
  const { sourceId, logo, bulletColor } = config;
  const articles = await getRawArticles(sourceId, articlesPerBrand, params);

  const bulletItems = articles.map((article) =>
    contentErrorHandler(
      () => bulletItem(article, sourceId, bulletColor),
      HandlerInputType.Brand,
      sourceId,
      params
    )
  );

  return {
    type: ContentBlockType.BulletList,
    logo,
    items: bulletItems
  };
};
