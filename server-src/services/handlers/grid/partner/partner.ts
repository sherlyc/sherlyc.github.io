import { handlerRunnerFunction } from "../../runner";
import {
  BrandModule,
  IBrandHandlerInput
} from "../../__types__/IBrandHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { brandConfig } from "../brand/brand-config";
import { createBulletList } from "../brand/bullet-list";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { chunk } from "lodash-es";
import { IPartnerContent } from "../../../../../common/__types__/IPartnerContent";
import { IBrandListConfig } from "../../__types__/IBrandConfig";
import { IPartnerHandlerInput } from "../../__types__/IPartnerHandlerInput";

const createPartnerContent = async (
  config: IBrandListConfig,
  articlesPerBrand: number,
  params: IParams
): Promise<IPartnerContent> => {
  return {
    type: ContentBlockType.PartnerContent,
    logo: config.logo,
    logoLink: config.logoLink,
    articles: [
      {
        id: "1",
        introText: "partner content intro",
        linkUrl: "http://1",
        indexHeadline: "partner content headline",
        title: "partner content headline",
        imageSrc: "1.jpg",
        lastPublishedTime: 1,
        strapName: "strap"
      },
      {
        id: "2",
        introText: "partner content intro2",
        linkUrl: "http://2",
        indexHeadline: "partner content headline",
        title: "partner content headline",
        imageSrc: "2.jpg",
        lastPublishedTime: 1,
        strapName: "strap"
      }
    ]
  } as IPartnerContent;
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  input: IPartnerHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const {
    moduleTitle,
    articlesPerBrand,
    brandListPerRow,
    configs
  } = brandConfig[BrandModule.Partner];
  const bulletLists = await Promise.all(
    Object.values(configs).map((brandListConfig) => {
      return createPartnerContent(brandListConfig, articlesPerBrand, params);
    })
  );

  const content: { [key in BrandGridPositions]: IContentBlock[] } = {
    [BrandGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName: moduleTitle,
        displayNameColor: "black"
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
