import flatten from "lodash-es/flatten";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IFeatureContainer } from "../../../../common/__types__/IFeatureContainer";
import { IParams } from "../../__types__/IParams";
import logger from "../../utils/logger";
import { HandlerInput } from "../__types__/HandlerInput";
import { IFeatureHandlerInput } from "../__types__/IFeatureHandlerInput";
import { handlerRunnerFunction } from "../runner";

const multiHandlerRunner = async (
  handlerRunner: handlerRunnerFunction,
  contents: HandlerInput[],
  params: IParams
): Promise<IContentBlock[]> => {
  const results = contents.map(async (content) => {
    return await handlerRunner(content, params);
  });

  return flatten(await Promise.all(results));
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  { name, content, fallback }: IFeatureHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    return [
      {
        type: ContentBlockType.FeatureContainer,
        name,
        content: content
          ? await multiHandlerRunner(handlerRunner, content, params)
          : [],
        fallback: fallback
          ? await multiHandlerRunner(handlerRunner, fallback, params)
          : []
      } as IFeatureContainer
    ];
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Feature handler error for ${name}`,
      error
    );
    return [];
  }
}
