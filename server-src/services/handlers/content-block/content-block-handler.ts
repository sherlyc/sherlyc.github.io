import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IContentBlockHandlerInput } from "../__types__/IContentBlockHandlerInput";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { contentBlocks }: IContentBlockHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return contentBlocks;
}
