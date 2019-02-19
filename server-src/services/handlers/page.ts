import { IContentBlock } from '../../../common/__types__/IContentBlock';
import handlerRunner, { HandlerInput } from './runner';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';

export interface IPageHandlerInput {
  type: 'Page';
  items: HandlerInput[];
}

export default async function({
  items
}: IPageHandlerInput): Promise<IContentBlock[]> {
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
