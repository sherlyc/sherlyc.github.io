import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../../runner";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  desktopGridConfig,
  IColumnGridConfig,
  IColumnGridTemplate,
  mobileGridConfig,
  tabletGridConfig,
  templateColumnsDesktop,
  templateColumnsTablet,
  templateRowsDesktop,
  templateRowsTablet
} from "./column-grid-config";

const getContentLength = (length: number) => {
  const min = 1;
  const max = 6;

  return Math.min(Math.max(length, min), max);
};

const getGridTemplateConfig = (length: number, config: IColumnGridTemplate) => {
  return config[length];
};

const getTemplateRowsForMobile = (length: number) => {
  return Array(length)
    .fill("auto")
    .join(" ");
};

const gridPositionName = (index: number) => `content${index}`;

const getGridBlocks = (length: number, gridConfig: IColumnGridConfig) => {
  const gridBlockConfig = gridConfig[length];
  return gridBlockConfig.reduce((acc, item, index) => {
    const { rowStart, colStart, border } = item;
    return {
      ...acc,
      [gridPositionName(index)]: gridBlock(rowStart, colStart, 1, 1, border)
    };
  }, {});
};

const getGridItems = (content: IContentBlock[][]) =>
  content.reduce(
    (acc, item, index) => ({
      ...acc,
      [gridPositionName(index)]: item
    }),
    {}
  );

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IColumnGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const contentLength = getContentLength(content.length);
  const mobileLayout: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: getTemplateRowsForMobile(contentLength),
    gridColumnGap: "0px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(contentLength, mobileGridConfig)
  };

  const tabletLayout: IGridConfig = {
    gridTemplateColumns: getGridTemplateConfig(
      contentLength,
      templateColumnsTablet
    ),
    gridTemplateRows: getGridTemplateConfig(contentLength, templateRowsTablet),
    gridColumnGap: "15px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(contentLength, tabletGridConfig)
  };

  const desktopLayout: IGridConfig = {
    gridTemplateColumns: getGridTemplateConfig(
      contentLength,
      templateColumnsDesktop
    ),
    gridTemplateRows: getGridTemplateConfig(contentLength, templateRowsDesktop),
    gridColumnGap: "15px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(contentLength, desktopGridConfig)
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
