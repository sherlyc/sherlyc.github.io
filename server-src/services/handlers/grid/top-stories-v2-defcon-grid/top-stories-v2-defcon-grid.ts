import { handlerRunnerFunction } from "../../runner";
import { ITopStoriesV2DefaultGridHandlerInput } from "../../__types__/ITopStoriesV2DefaultGridHandlerInput";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesV2DefconGridHandlerInput } from "../../__types__/ITopStoriesV2DefconGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: ITopStoriesV2DefconGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
