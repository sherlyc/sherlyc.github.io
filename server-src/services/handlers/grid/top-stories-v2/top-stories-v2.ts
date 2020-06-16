import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { ITopStoriesV2HandlerInput } from "../../__types__/ITopStoriesV2HandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  {
    strapName,
    color,
    midInsertContent,
    lowerRightContent,
  }: ITopStoriesV2HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
