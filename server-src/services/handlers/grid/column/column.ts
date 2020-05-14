import { handlerRunnerFunction } from "../../runner";
import { IParams } from "../../../__types__/IParams";
import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IColumnHandlerInput } from "../../__types__/IColumnHandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { HandlerInput } from "../../__types__/HandlerInput";

const multiHandlerRunner = async (
  handlerRunner: handlerRunnerFunction,
  contents: HandlerInput[],
  params: IParams
): Promise<IContentBlock[][]> => {
  const results = contents.map(async (content) => {
    return await handlerRunner(content, params);
  });

  return await Promise.all(results);
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    content,
    columnGap = 40,
    rowGap = 10,
    border = true
  }: IColumnHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return await handlerRunner({
    type: HandlerInputType.ColumnGrid,
    content: await multiHandlerRunner(handlerRunner, content, params),
    border: false,
  }, params);
}
