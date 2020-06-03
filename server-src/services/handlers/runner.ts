import { IContentBlock } from "../../../common/__types__/IContentBlock";
import { IParams } from "../__types__/IParams";
import { HandlerInput } from "./__types__/HandlerInput";
import handlerRegistry from "./registry";

export type handlerRunnerFunction = (
  handlerInput: HandlerInput,
  params: IParams
) => Promise<IContentBlock[]>;

export default function handlerRunner(
  handlerInput: HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return handlerRegistry[handlerInput.type](
    handlerRunner,
    handlerInput,
    params
  );
}
