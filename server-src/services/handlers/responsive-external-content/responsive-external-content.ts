import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { handlerRunnerFunction } from "../runner";
import { IParams } from "../../__types__/IParams";
import { IResponsiveExternalContentHandlerInput } from "../__types__/IResponsiveExternalContentHandlerInput";
import logger from "../../utils/logger";
import { stringifyUrl } from "query-string";
import http from "../../utils/http";

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
    const urlWithCacheBust = stringifyUrl({
      url,
      query: { "cache-bust": `${Math.random()}` }
    });
    await http(params).get(urlWithCacheBust);
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
