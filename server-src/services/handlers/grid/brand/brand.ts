import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  brandConfig,
  networkBrandConfig,
  partnerBrandConfig
} from "./brand-config";
import {
  BrandModule,
  IBrandHandlerInput
} from "../../__types__/IBrandHandlerInput";
import { chunk } from "lodash";
import { createBulletList } from "./bullet-list";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { module }: IBrandHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const moduleConfig = brandConfig[module];
  const bulletLists = await Promise.all(
    Object.values(moduleConfig.configs).map((brandListConfig) => {
      return createBulletList(
        brandListConfig,
        moduleConfig.articlesPerBrand,
        params
      );
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
