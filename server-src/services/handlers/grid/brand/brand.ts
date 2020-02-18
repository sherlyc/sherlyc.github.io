import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { getRawArticles } from "../../../adapters/article-retriever/article-retriever";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IBulletList } from "../../../../../common/__types__/IBulletList";
import { brandConfig } from "./brand-config";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import { bulletItem } from "../../../adapters/article-converter/bullet-item.converter";
import { contentErrorHandler } from "../content-error-handler";
import {
  IBrandConfig,
  NetworkBrand
} from "../../__types__/INetworkBrandConfig";
import { chunk } from "lodash";

const createBulletList = async (
  config: IBrandConfig,
  params: IParams
): Promise<IBulletList> => {
  const { sourceId, logo, bulletColor } = config;
  const totalArticles = 5;
  const articles = await getRawArticles(sourceId, totalArticles, params);
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

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IBrandHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const bulletLists = await Promise.all(
    Object.values(brandConfig.configs).map((config) => {
      return createBulletList(config, params);
    })
  );

  const content: { [key in BrandGridPositions]: IContentBlock[] } = {
    [BrandGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName: "Our Network's Top Stories",
        displayNameColor: "black"
      }
    ],
    [BrandGridPositions.FirstRow]: [
      ...(await handlerRunner(
        {
          type: HandlerInputType.ColumnGrid,
          content: chunk(bulletLists.slice(0, 5))
        },
        params
      ))
    ],
    [BrandGridPositions.SecondRow]: [
      ...(await handlerRunner(
        {
          type: HandlerInputType.ColumnGrid,
          content: chunk(bulletLists.slice(5))
        },
        params
      ))
    ]
  };

  return [
    ...(await handlerRunner(
      {
        type: HandlerInputType.BrandGrid,
        content
      },
      params
    ))
  ];
}
