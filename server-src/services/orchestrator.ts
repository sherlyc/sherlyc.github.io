import { IContentBlock } from '../../common/__types__/IContentBlock';
import { IErrorBlock } from '../../common/__types__/IErrorBlock';
import handlerRunner, { HandlerType } from './handlers/runner';
import { sections } from './section';
import { IPageHandlerInput } from './handlers/page';

export default async (): Promise<IContentBlock[]> => {
  try {
    return await handlerRunner(HandlerType.Page, {
      sections
    } as IPageHandlerInput);
  } catch (e) {
    return [
      { type: 'Header' },
      { type: 'ErrorBlock', message: e.message } as IErrorBlock,
      { type: 'Footer' }
    ];
  }
};
