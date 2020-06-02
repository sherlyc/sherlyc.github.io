import { handlerRunnerFunction } from "../../runner";
import { BrandModule } from "../../__types__/IBrandHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { brandConfig } from "../brand/brand-config";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IPartnerHandlerInput } from "../../__types__/IPartnerHandlerInput";
import { createPartnerContent } from "./partner-content";
import {
  Border,
  IGridBlocks,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";
import { IModuleTitle } from "../../../../../common/__types__/IModuleTitle";
import { chunk } from "lodash-es";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { gridBlock } from "../../../adapters/grid/grid-block";

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

  const columnGrids = await Promise.all(
    chunk(partnerContents, brandListPerRow).map(async (partnerContent) => {
      return [
        ...(await handlerRunner(
          {
            type: HandlerInputType.ColumnGrid,
            content: chunk(partnerContent, 1)
          },
          params
        ))
      ];
    })
  );

  const rowItems = columnGrids.reduce(
    (acc, columnGrid, index) => ({
      ...acc,
      [`Row${index}`]: columnGrid
    }),
    {}
  );

  const rowNames = Object.keys(rowItems);
  const gridBlocks: IGridBlocks = rowNames.reduce(
    (acc, rowName, index) => ({
      ...acc,
      [rowName]: gridBlock(
        index + 2,
        1,
        1,
        1,
        index < rowNames.length - 1 ? [Border.bottom] : []
      )
    }),
    {
      ModuleTitle: gridBlock(1, 1, 1, 1, [])
    }
  );

  const gridContainer: IGridContainer = {
    type: ContentBlockType.GridContainer,
    items: {
      ModuleTitle: [
        {
          type: ContentBlockType.ModuleTitle,
          displayName: moduleTitle,
          displayNameColor: "black"
        } as IModuleTitle
      ],
      ...rowItems
    },
    mobile: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "10px",
      gridBlocks
    },
    tablet: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "20px",
      gridBlocks
    },
    desktop: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto auto auto",
      gridColumnGap: "0px",
      gridRowGap: "40px",
      gridBlocks
    }
  };

  return [gridContainer];
}
