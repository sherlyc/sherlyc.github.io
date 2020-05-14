import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IHalfFourHandlerInput } from "../../__types__/IHalfFourHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    sourceId,
    strapName,
    displayName,
    color,
    linkUrl
  }: IHalfFourHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
