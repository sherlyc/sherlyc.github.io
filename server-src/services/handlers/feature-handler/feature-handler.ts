import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import logger from "../../utils/logger";
import { IFeatureHandlerInput } from "../__types__/IFeatureHandlerInput";
import { IFeatureContainer } from "../../../../common/__types__/IFeatureContainer";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { name, content }: IFeatureHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    return [
      {
        type: ContentBlockType.FeatureContainer,
        name,
        content: await handlerRunner(content, params)
      } as IFeatureContainer
    ];
  } catch (e) {
    logger.error(
      params.apiRequestId,
      `Feature handler error for ${name} - ${e}`
    );
    return [];
  }
}
