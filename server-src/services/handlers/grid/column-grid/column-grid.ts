import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { Border, IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../../runner";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  desktopGridConfig,
  IDictionary,
  ITemplateDictionary,
  mobileGridConfig,
  tabletGridConfig,
  templateColumnsDesktop,
  templateColumnsTablet,
  templateRowsDesktop,
  templateRowsTablet
} from "./column-grid-config";

const getGridTemplateValue = (length: number, config: ITemplateDictionary) => {
  return config[length];
};

const getTemplateRowsForMobile = (length: number) => {
  return length ? Array(length).fill("auto").join(" ")
    : "auto";
};

const gridPositionName = (index: number) => `content${index}`;

export const getGridBlocks = (length: number, gridConfig: IDictionary) => {
  const arr = gridConfig[length];
  const result = arr.reduce(
    (acc, item, index) => ({
      ...acc,
      [gridPositionName(index)]: gridBlock(
        item[0],
        item[1],
        1,
        1,
        index === length - 1 ? [] : [Border.right]
      )
    }),
    {}
  );

  return result;
};

const getGridItems = (content: IContentBlock[][]) => {
  const result = content.reduce(
    (final, current, index) => ({
      ...final,
      [gridPositionName(index)]: current
    }),
    {}
  );

  return result;
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IColumnGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const contentLength = content.length;
  const mobileLayout: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: getTemplateRowsForMobile(contentLength),
    gridColumnGap: "0px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(content.length, mobileGridConfig)
  };

  const tabletLayout: IGridConfig = {
    gridTemplateColumns: getGridTemplateValue(contentLength, templateColumnsTablet),
    gridTemplateRows: getGridTemplateValue(contentLength, templateRowsTablet),
    gridColumnGap: "15px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(content.length, tabletGridConfig)
  };

  const desktopLayout: IGridConfig = {
    gridTemplateColumns: getGridTemplateValue(contentLength, templateColumnsDesktop),
    gridTemplateRows: getGridTemplateValue(contentLength, templateRowsDesktop),
    gridColumnGap: "15px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(content.length, desktopGridConfig)
  };
  return [
    {
      type: ContentBlockType.GridContainer,
      items: getGridItems(content),
      mobile: mobileLayout,
      tablet: tabletLayout,
      desktop: desktopLayout
    }
  ];
}
