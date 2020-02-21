import { handlerRunnerFunction } from "../runner";
import { IBannerHandlerInput } from "../__types__/IBannerHandlerInput";
import { IParams } from "../../__types__/IParams";
import getBanner from "../../adapters/banner/banner";
import logger from "../../utils/logger";
import * as moment from "moment";
import { IBannerResponse } from "../../adapters/__types__/IBannerResponse";
import { HandlerInputType } from "../__types__/HandlerInputType";
import { IContentBlock } from "../../../../common/__types__/IContentBlock";
import { IExternalContentHandlerInput } from "../__types__/IExternalContentHandlerInput";

const getActiveBanner = (banners: IBannerResponse[]) => {
  const currentTime = moment.utc();
  return banners.find(({ startDateTimeUTC, endDateTimeUTC }) =>
    currentTime.isBetween(
      moment.utc(startDateTimeUTC),
      moment.utc(endDateTimeUTC),
      "ms",
      "[]"
    )
  );
};

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
