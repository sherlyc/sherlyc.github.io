import { handlerRunnerFunction } from '../runner';
import { IBannerHandlerInput } from '../__types__/IBannerHandlerInput';
import { IParams } from '../../__types__/IParams';
import getBanner from '../../adapters/banner';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IExternalContentUnit } from '../../../../common/__types__/IExternalContentUnit';

export default async function(handlerRunner: handlerRunnerFunction, {}: IBannerHandlerInput, params: IParams): Promise<IExternalContentUnit[]> {
  const defaultBanner: Partial<IExternalContentUnit> = {
    type: ContentBlockType.ExternalContentUnit,
    height: '50px',
    width: '100%',
    margin: '0 0 10px 0'
  };
  const banner = await getBanner(params);
  return [{...defaultBanner, ...banner} as IExternalContentUnit];
}
