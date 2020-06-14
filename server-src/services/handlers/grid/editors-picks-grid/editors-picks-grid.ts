import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IEditorsPicksGridHandlerInput } from "../../__types__/IEditorsPicksGridHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content }: IEditorsPicksGridHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
