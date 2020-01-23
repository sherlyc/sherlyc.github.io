import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../../runner";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import {
  mobileGridConfig,
  tabletGridConfig,
  desktopGridConfig,
  templateColumnsDesktop,
  templateColumnsTablet,
  templateRowsDesktop,
  templateRowsTablet,
  templateRowsForMobile,
  getGridTemplateConfig
} from "./column-grid-config";
import {
  IColumnGridConfig,
  IColumnGridTemplate
} from "./__types__/IColumnGridDefinition";

const getNumColumnsFor = (contentLength: number) => {
  const min = 1;
  const max = 6;

  return Math.min(Math.max(contentLength, min), max);
};

const gridPositionName = (index: number) => `content${index}`;

const getGridBlocks = (numColumns: number, gridConfig: IColumnGridConfig) => {
  const gridBlockConfig = gridConfig[numColumns];
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
  const numColumns = getNumColumnsFor(content.length);
  const mobile: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: templateRowsForMobile(numColumns),
    gridColumnGap: "0px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(numColumns, mobileGridConfig)
  };

  const tablet: IGridConfig = {
    gridTemplateColumns: getGridTemplateConfig(
      numColumns,
      templateColumnsTablet
    ),
    gridTemplateRows: getGridTemplateConfig(numColumns, templateRowsTablet),
    gridColumnGap: "15px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(numColumns, tabletGridConfig)
  };

  const desktop: IGridConfig = {
    gridTemplateColumns: getGridTemplateConfig(
      numColumns,
      templateColumnsDesktop
    ),
    gridTemplateRows: getGridTemplateConfig(numColumns, templateRowsDesktop),
    gridColumnGap: "15px",
    gridRowGap: "10px",
    gridBlocks: getGridBlocks(numColumns, desktopGridConfig)
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: getGridItems(content),
      mobile,
      tablet,
      desktop
    }
  ];
}
