import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { IExternalContentHandlerInput } from '../__types__/IExternalContentHandlerInput';
import logger from '../../utils/logger';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { url, height, width }: IExternalContentHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    return [
      {
        type: ContentBlockType.ExternalContentUnit,
        url,
        width,
        height
      }
    ];
  } catch (e) {
    logger.error(
      params.apiRequestId,
      `External content handler error for ${url} - ${e}`
    );
    return [];
  }

}
