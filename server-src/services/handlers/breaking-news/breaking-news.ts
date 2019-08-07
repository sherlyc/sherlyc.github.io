import { handlerRunnerFunction } from '../runner';
import { IBreakingNewsHandlerInput } from '../__types__/IBreakingNewsHandlerInput';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBreakingNews } from '../../../../common/__types__/IBreakingNews';
import getBreakingNews from '../../adapters/breaking-news';
import { IBreakingNewsResponse } from '../../adapters/__types__/IBreakingNewsResponse';
import { IParams } from '../../__types__/IParams';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import logger from '../../utils/logger';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {  }: IBreakingNewsHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  try {
    const {
      id,
      text,
      link,
      enabled
    }: IBreakingNewsResponse = await getBreakingNews(params);
    return enabled
      ? [
          {
            type: ContentBlockType.BreakingNews,
            id,
            text,
            link
          } as IBreakingNews
        ]
      : [];
  } catch (e) {
    logger.error(params.apiRequestId, `Breaking News handler error - ${e}`);
    return [];
  }
}
