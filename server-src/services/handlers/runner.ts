import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { HandlerInput } from './__types__/HandlerInput';
import handlerRegistry from './registry';

export type handlerRunnerFunction = (
  handlerInput: HandlerInput
) => Promise<IContentBlock[]>;

export default async function handlerRunner(
  handlerInput: HandlerInput
): Promise<IContentBlock[]> {
  return await handlerRegistry[handlerInput.type](handlerRunner, handlerInput);
}
