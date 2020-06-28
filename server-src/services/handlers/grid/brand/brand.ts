import { chunk } from "lodash-es";
import { AccentColor } from "../../../../../common/__types__/AccentColor";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { IBrandHandlerInput } from "../../__types__/IBrandHandlerInput";
import { brandConfig } from "./brand-config";
import { createBulletList } from "./bullet-list";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { module }: IBrandHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const {
    moduleTitle,
    articlesPerBrand,
    brandListPerRow,
    configs
  } = brandConfig[module];
  const bulletLists = await Promise.all(
    Object.values(configs).map((brandListConfig) => {
      return createBulletList(brandListConfig, articlesPerBrand, params);
    })
  );

  const content: { [key in BrandGridPositions]: IContentBlock[] } = {
    [BrandGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleHeader,
        title: moduleTitle,
        color: AccentColor.Black
      }
    ],
    [BrandGridPositions.FirstRow]: [
      ...(await handlerRunner(
        {
          type: HandlerInputType.ColumnGrid,
          content: chunk(bulletLists.slice(0, brandListPerRow))
        },
        params
      ))
    ],
    [BrandGridPositions.SecondRow]: [
      ...(await handlerRunner(
        {
          type: HandlerInputType.ColumnGrid,
          content: chunk(bulletLists.slice(brandListPerRow))
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
