import { handlerRunnerFunction } from "../../runner";
import { BrandModule } from "../../__types__/IBrandHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { brandConfig } from "../brand/brand-config";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IPartnerHandlerInput } from "../../__types__/IPartnerHandlerInput";
import { createPartnerContent } from "./partner-content";
import { chunk } from "lodash-es";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { BrandGridPositions } from "../../__types__/IBrandGridHandlerInput";

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
  const partnerContents = await Promise.all(
    Object.values(configs).map((brandListConfig) => {
      return createPartnerContent(brandListConfig, articlesPerBrand, params);
    })
  );

  const firstRowContent = chunk(partnerContents.slice(0, brandListPerRow));
  const secondRowContent = chunk(partnerContents.slice(brandListPerRow));
  const content: { [key in BrandGridPositions]: IContentBlock[] } = {
    [BrandGridPositions.ModuleTitle]: [
      {
        type: ContentBlockType.ModuleTitle,
        displayName: moduleTitle,
        displayNameColor: "black"
      }
    ],
    [BrandGridPositions.FirstRow]: await handlerRunner(
      {
        type: HandlerInputType.ColumnGrid,
        content: firstRowContent
      },
      params
    ),
    [BrandGridPositions.SecondRow]:
      secondRowContent.length > 0
        ? await handlerRunner(
            {
              type: HandlerInputType.ColumnGrid,
              content: secondRowContent
            },
            params
          )
        : []
  };

  return await handlerRunner(
    {
      type: HandlerInputType.BrandGrid,
      content
    },
    params
  );
}
