import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ILargeLeadSixGridHandlerInput } from "../../__types__/ILargeLeadSixGridHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: ILargeLeadSixGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
