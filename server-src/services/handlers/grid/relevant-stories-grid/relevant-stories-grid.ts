import { handlerRunnerFunction } from "../../runner";
import { INewsSixGridHandlerInput } from "../../__types__/INewsSixGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IRelevantStoriesGridHandlerInput } from "../../__types__/IRelevantStoriesGridHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IRelevantStoriesGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
