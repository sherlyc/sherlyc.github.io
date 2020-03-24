import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IResponsiveExternalContentHandlerInput } from "../__types__/IResponsiveExternalContentHandlerInput";
import cacheHttp from "../../utils/cache-http";
import logger from "../../utils/logger";

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    url,
    scrollable,
    lazyLoad,
    mobile,
    desktop,
    tablet
  }: IResponsiveExternalContentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    await cacheHttp(params, url, 5000, true);
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
      type: ContentBlockType.ResponsiveExternalContent,
      url,
      scrollable,
      lazyLoad,
      mobile,
      tablet,
      desktop
    }
  ];
}
