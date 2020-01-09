import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IListGridHandlerInput } from "../../__types__/IListGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  Border,
  IGridBlock,
  IGridConfig,
  IGridContainer
} from "../../../../../common/__types__/IGridContainer";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IListGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    gridColumnGap: "0px",
    gridRowGap: "10px",
    gridBlocks: {
      content0: {
        columnSpan: 1,
        columnStart: 1,
        rowSpan: 1,
        rowStart: 2,
        border: [Border.bottom]
      },
      content1: {
        columnSpan: 1,
        columnStart: 1,
        rowSpan: 1,
        rowStart: 1,
        border: []
      }
    }
  };

  const grid: IGridContainer = {
    type: ContentBlockType.GridContainer,
    items: content,
    mobile: layout,
    tablet: layout,
    desktop: layout
  };

  return [grid];
}
