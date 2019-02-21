import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IPageHandlerInput } from './__types__/IPageHandlerInput';
import { handlerRunnerFunction } from './runner';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { items }: IPageHandlerInput
): Promise<IContentBlock[]> {
  return [
    { type: ContentBlockType.Header },
    {
      type: ContentBlockType.Container,
      items: (await Promise.all(
        items.map((item) => handlerRunner(item))
      )).reduce((final, item) => [...final, ...item], [])
    },
    { type: 'Footer' }
  ];
}
