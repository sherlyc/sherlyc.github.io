import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { HandlerInput } from './__types__/HandlerInput';
import handlerRegistry from './registry';
import { IParams } from '../__types__/IParams';

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
    return [];
  }
}
