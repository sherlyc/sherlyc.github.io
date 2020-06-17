import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { gridBlock } from "../../adapters/grid/grid-block";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { ITitleSectionHandlerInput } from "../__types__/ITitleSectionHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
    linkUrl,
    content
  }: ITitleSectionHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const grid = {
    title: gridBlock(1, 1, 1, 1, []),
    content: gridBlock(2, 1, 1, 1, [])
  };

  return [
    {
      type: ContentBlockType.GridContainer,
      items: {
        title: [
          {
            type: ContentBlockType.ModuleTitle,
            displayName,
            displayNameColor,
            linkUrl
          }
        ],
        content: await handlerRunner(content, params)
      },
      mobile: {
        gridRowGap: "10px",
        gridColumnGap: "0px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridBlocks: grid
      },
      tablet: {
        gridRowGap: "20px",
        gridColumnGap: "0px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridBlocks: grid
      },
      desktop: {
        gridRowGap: "40px",
        gridColumnGap: "0px",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "auto auto",
        gridBlocks: grid
      }
    }
  ];
}
