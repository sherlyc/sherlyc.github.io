import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IHalfFourGridHandlerInput } from "../../__types__/IHalfFourGridHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: IHalfFourGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
