import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesV2GridHandlerInput } from "../../__types__/ITopStoriesV2GridHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2GridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
