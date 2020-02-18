import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { networkBrandConfig } from "./brand-config";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import { chunk } from "lodash";
import { createBulletList } from "./bullet-list";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IBrandHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const bulletLists = await Promise.all(
    Object.values(networkBrandConfig.configs).map((config) => {
      return createBulletList(config, networkBrandConfig.articlesPerBrand, params);
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
