import { IContentBlock } from '../../common/__types__/IContentBlock';
import { IErrorBlock } from '../../common/__types__/IErrorBlock';
import handlerRunner, { HandlerType } from './handlers/runner';

export default async (): Promise<IContentBlock[]> => {
  try {
    return await handlerRunner({
      type: HandlerType.Page,
      totalArticlesPerSection: 5,
      sections: [
        'national',
        'world',
        'video',
        'entertainment',
        'business',
        'technology'
      ]
    });
  } catch (e) {
    return [
      { type: 'Header' },
      { type: 'ErrorBlock', message: e.message } as IErrorBlock,
      { type: 'Footer' }
    ];
  }
};
