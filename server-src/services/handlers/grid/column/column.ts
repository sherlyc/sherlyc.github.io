import { IContentBlock } from "../../../../../common/__types__/IContentBlock";
import { IParams } from "../../../__types__/IParams";
import { handlerRunnerFunction } from "../../runner";
import { HandlerInput } from "../../__types__/HandlerInput";
import { HandlerInputType } from "../../__types__/HandlerInputType";
import { IColumnHandlerInput } from "../../__types__/IColumnHandlerInput";

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

export default async function (
  handlerRunner: handlerRunnerFunction,
  { content, columnGap = 40, rowGap = 10, border = true }: IColumnHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return await handlerRunner(
    {
      type: HandlerInputType.ColumnGrid,
      content: await multiHandlerRunner(handlerRunner, content, params),
      columnGap,
      rowGap,
      border
    },
    params
  );
}
