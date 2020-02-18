import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { IParams } from "../../../__types__/IParams";
import { gridBlock } from "../../../adapters/grid/grid-block";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { handlerRunnerFunction } from "../../runner";
import { IColumnGridBlock } from "./__types__/IColumnGridConfig";
import {
  desktopColumnGridConfig,
  mobileColumnGridConfig,
  tabletColumnGridConfig
} from "./column-grid-config";

const getNumColumnsFor = (contentLength: number) => {
  const min = 1;
  const max = 6;

  return Math.min(Math.max(contentLength, min), max);
};

const gridPositionName = (index: number) => `content${index}`;

const getGridBlocks = (gridBlockConfig: IColumnGridBlock[]) => {
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
  { content, options }: IColumnGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const numColumns = getNumColumnsFor(content.length);

  const mobileConfig = mobileColumnGridConfig(options)[numColumns];
  const mobile: IGridConfig = {
    gridTemplateColumns: mobileConfig.gridTemplateColumns,
    gridTemplateRows: mobileConfig.gridTemplateRows,
    gridColumnGap: mobileConfig.gridColumnGap,
    gridRowGap: mobileConfig.gridRowGap,
    gridBlocks: getGridBlocks(mobileConfig.gridBlocks)
  };

  const tabletConfig = tabletColumnGridConfig(options)[numColumns];
  const tablet: IGridConfig = {
    gridTemplateColumns: tabletConfig.gridTemplateColumns,
    gridTemplateRows: tabletConfig.gridTemplateRows,
    gridColumnGap: tabletConfig.gridColumnGap,
    gridRowGap: tabletConfig.gridRowGap,
    gridBlocks: getGridBlocks(tabletConfig.gridBlocks)
  };

  const desktopConfig = desktopColumnGridConfig(options)[numColumns];
  const desktop: IGridConfig = {
    gridTemplateColumns: desktopConfig.gridTemplateColumns,
    gridTemplateRows: desktopConfig.gridTemplateRows,
    gridColumnGap: desktopConfig.gridColumnGap,
    gridRowGap: desktopConfig.gridRowGap,
    gridBlocks: getGridBlocks(desktopConfig.gridBlocks)
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
