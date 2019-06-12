import { handlerRunnerFunction } from '../runner';
import { IBreakingNewsHandlerInput } from '../__types__/IBreakingNewsHandlerInput';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import getBreakingNews from '../../adapters/breaking-news';
import { IBreakingNewsResponse } from '../../adapters/__types__/IBreakingNewsResponse';
import { IParams } from '../../__types__/IParams';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { variant }: IBreakingNewsHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const {
    id,
    text,
    link,
    enabled
  }: IBreakingNewsResponse = await getBreakingNews(params);
  return enabled
    ? [
        {
          type: 'BreakingNews',
          id,
          text,
          link,
          variant
        } as IBreakingNews
      ]
    : [];
}
