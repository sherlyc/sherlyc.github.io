import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import cacheHttp from "../../utils/cache-http";
import logger from "../../utils/logger";
import { IParams } from "../../__types__/IParams";
import { handlerRunnerFunction } from "../runner";
import { IExternalContentHandlerInput } from "../__types__/IExternalContentHandlerInput";

export default async function (
  handlerRunner: handlerRunnerFunction,
  { url, height, width, margin, scrollable }: IExternalContentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const { data } = await cacheHttp<string>(params, url);

    if (data.trim().length > 0) {
      return [
        {
          type: ContentBlockType.ExternalContentUnit,
          url,
          width,
          height,
          margin,
          scrollable
        }
      ];
    }
  } catch (error) {
    logger.warn(
      params.apiRequestId,
      `External content handler error - ${url}`,
      error
    );
  }
  return [];
}
