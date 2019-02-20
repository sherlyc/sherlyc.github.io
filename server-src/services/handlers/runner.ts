import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { HandlerInput } from './__types__/HandlerInput';
import handlerRegistry from './registry';

export default async function(
  handlerInput: HandlerInput
): Promise<IContentBlock[]> {
  return await handlerRegistry[handlerInput.type](handlerInput);
}
