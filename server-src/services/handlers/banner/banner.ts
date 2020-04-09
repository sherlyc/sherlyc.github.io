import { isWithinInterval, parseISO } from "date-fns";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IParams } from "../../__types__/IParams";
import { IBannerResponse } from "../../adapters/__types__/IBannerResponse";
import getBanner from "../../adapters/banner/banner";
import logger from "../../utils/logger";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IBannerHandlerInput } from "../__types__/IBannerHandlerInput";
import { IExternalContentHandlerInput } from "../__types__/IExternalContentHandlerInput";
import { handlerRunnerFunction } from "../runner";

const getActiveBanner = (banners: IBannerResponse[]) =>
  banners.find(({ startDateTimeUTC, endDateTimeUTC }) =>
    isWithinInterval(Date.now(), {
      start: parseISO(startDateTimeUTC),
      end: parseISO(endDateTimeUTC)
    })
  );

const defaultExternalContentHandlerInput: Partial<IExternalContentHandlerInput> = {
  type: HandlerInputType.ExternalContent,
  width: "100%",
  margin: "0 0 10px 0",
  height: "50px"
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {}: IBannerHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const banners = await getBanner(params);
    const activeBanner = getActiveBanner(banners);
    return activeBanner
      ? await handlerRunner(
          {
            ...defaultExternalContentHandlerInput,
            ...activeBanner.banner
          } as IExternalContentHandlerInput,
          params
        )
      : [];
  } catch (error) {
    logger.error(params.apiRequestId, `Banner handler error`, error);
    return [];
  }
}
