import { handlerRunnerFunction } from './runner';
import { IBreakingNewsHandlerInput } from './__types__/IBreakingNewsHandlerInput';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBreakingNews } from '../../../common/__types__/IBreakingNews';
import getBreakingNews from '../adapters/breaking-news';
import { IRawBreakingNews } from '../adapters/__types__/IRawBreakingNews';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { ignoreBreakingNews }: IBreakingNewsHandlerInput
): Promise<IContentBlock[]> {
  const { id, text, link, enabled }: IRawBreakingNews = await getBreakingNews();
  const shouldIgnore = !enabled || ignoreBreakingNews === id;
  return shouldIgnore
    ? []
    : [
        {
          type: 'BreakingNews',
          id,
          text,
          link
        } as IBreakingNews
      ];
}
