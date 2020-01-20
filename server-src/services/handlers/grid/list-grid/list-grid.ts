import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IListGridHandlerInput } from "../../__types__/IListGridHandlerInput";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import {
  Border,
  IGridConfig
} from "../../../../../common/__types__/IGridContainer";
import { gridBlock } from "../../../adapters/grid/grid-block";

const gridPositionName = (index: number) => `content${index}`;

const generateGridBlocks = (content: IContentBlock[]) =>
  content.reduce(
    (final, item, index) => ({
      ...final,
      [gridPositionName(index)]: gridBlock(
        index + 1,
        1,
        1,
        1,
        index === content.length - 1 ? [] : [Border.bottom]
      )
    }),
    {}
  );

const generateGridItems = (content: IContentBlock[]) =>
  content.reduce(
    (final, current, index) => ({
      ...final,
      [gridPositionName(index)]: [current]
    }),
    {}
  );

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IListGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  console.log("listGrid", content);
  const layout: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    gridColumnGap: "0px",
    gridRowGap: "10px",
    gridBlocks: generateGridBlocks(content)
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: generateGridItems(content),
      mobile: layout
    }
  ];
}
