import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IPageHandlerInput } from "../__types__/IPageHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { items }: IPageHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [
    { type: ContentBlockType.Header },
    {
      type: ContentBlockType.Container,
      items: (
        await Promise.all(items.map((item) => handlerRunner(item, params)))
      ).reduce((final, item) => [...final, ...item], [])
    },
    { type: ContentBlockType.Footer }
  ];
}
