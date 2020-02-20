import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IExternalContentHandlerInput } from "../__types__/IExternalContentHandlerInput";
import cacheHttp from "../../utils/cache-http";
import logger from "../../utils/logger";

export default async function(
  handlerRunner: handlerRunnerFunction,
  { url, mobile, desktop, tablet }: IExternalContentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    await cacheHttp(params, url);
  } catch (error) {
    logger.warn(
      params.apiRequestId,
      `External content handler error - ${url}`,
      error
    );

    return [];
  }

  return [
    {
      type: ContentBlockType.ExternalContentUnit,
      url,
      mobile,
      tablet,
      desktop
    }
  ];
}
