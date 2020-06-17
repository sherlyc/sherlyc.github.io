import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IContentBlockHandlerInput } from "../__types__/IContentBlockHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { contentBlocks }: IContentBlockHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return contentBlocks;
}
