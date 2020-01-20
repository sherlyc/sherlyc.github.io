import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../../runner";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  IColumnGridConfig,
  IColumnGridTemplate,
  desktopGridConfig,
  mobileGridConfig,
  tabletGridConfig,
  templateColumnsDesktop,
  templateColumnsTablet,
  templateRowsDesktop,
  templateRowsTablet
} from "./column-grid-config";

const validateLength = (length: number) => {
  const maxColumnCap = 6;

  if (length > 0 && length <= maxColumnCap) {
    return length;
  } else if (length > maxColumnCap) {
    return maxColumnCap;
  }
  return 1;
};

const getGridTemplateConfig = (length: number, config: IColumnGridTemplate) => {
  const lengthNum: number = validateLength(length);
  return config[lengthNum];
};

const getTemplateRowsForMobile = (length: number) => {
  const lengthNum: number = validateLength(length);
  return lengthNum
    ? Array(length)
        .fill("auto")
        .join(" ")
    : "auto";
};

const gridPositionName = (index: number) => `content${index}`;

const getGridBlocks = (length: number, gridConfig: IColumnGridConfig) => {
  const lengthNum: number = validateLength(length);
  const arr = gridConfig[lengthNum];
  const result = arr.reduce(
    (acc, item, index) => ({
      ...acc,
      [gridPositionName(index)]: gridBlock(item[0], item[1], 1, 1, [])
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
