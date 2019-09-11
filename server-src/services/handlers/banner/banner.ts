import { handlerRunnerFunction } from '../runner';
import { IBannerHandlerInput } from '../__types__/IBannerHandlerInput';
import { IParams } from '../../__types__/IParams';
import getBanner from '../../adapters/banner';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';
import logger from '../../utils/logger';
import * as moment from 'moment';
import { IBannerResponse } from '../../adapters/__types__/IBannerResponse';

const getActiveBanner = (banners: IBannerResponse[]) => {
  const currentTime = moment.utc();
  return banners.find(({ startDateTimeUTC, endDateTimeUTC }) =>
    currentTime.isBetween(
      moment.utc(startDateTimeUTC),
      moment.utc(endDateTimeUTC),
      'ms',
      '[]'
    )
  );
};

export default async function(
  handlerRunner: handlerRunnerFunction,
  {  }: IBannerHandlerInput,
  params: IParams
): Promise<IExternalContentUnit[]> {
  const defaultBanner: Partial<IExternalContentUnit> = {
    type: ContentBlockType.ExternalContentUnit,
    height: '50px',
    width: '100%',
    margin: '0 0 10px 0'
  };
  try {
    const banners = await getBanner(params);
    const activeBanner = getActiveBanner(banners);
    return activeBanner
      ? [{ ...defaultBanner, ...activeBanner.banner } as IExternalContentUnit]
      : [];
  } catch (e) {
    logger.error(params.apiRequestId, `Banner handler error - ${e}`);
    return [];
  }
}