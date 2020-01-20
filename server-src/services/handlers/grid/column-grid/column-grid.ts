import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IGridConfig } from "../../../../../common/__types__/IGridContainer";
import { ContentBlockType } from "../../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../../runner";
import { IColumnGridHandlerInput } from "../../__types__/IColumnGridHandlerInput";
import { IParams } from "../../../__types__/IParams";

const gridPositionName = (index: number) => `content${index}`;

const generateGridItems = (content: IContentBlock[][]) =>
  content.reduce(
    (final, current, index) => ({
      ...final,
      [gridPositionName(index)]: [current]
    }),
    {}
  );

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IColumnGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  console.log("content", content);
  const layout: IGridConfig = {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto",
    gridColumnGap: "0px",
    gridRowGap: "10px",
    gridBlocks: {
      content0: {
        columnStart: 1,
        columnSpan: 1,
        rowStart: 1,
        rowSpan: 1,
        border: []
      }
    },
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: {
        content0: content[0]
      },
      mobile: layout,
      tablet: layout,
      desktop: layout
    }
  ];
}
