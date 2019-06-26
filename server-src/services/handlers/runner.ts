import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { HandlerInput } from './__types__/HandlerInput';
import handlerRegistry from './registry';
import { IParams } from '../__types__/IParams';
import logger from '../utils/logger';

export type handlerRunnerFunction = (
  handlerInput: HandlerInput,
  params: IParams
) => Promise<IContentBlock[]>;

export default async function handlerRunner(
  handlerInput: HandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    return await handlerRegistry[handlerInput.type](
      handlerRunner,
      handlerInput,
      params
    );
  } catch (error) {
    logger.error(
      params.apiRequestId,
      `Handler Runner Error for ${handlerInput.type} - ${error}`
    );
    return [];
  }
}
