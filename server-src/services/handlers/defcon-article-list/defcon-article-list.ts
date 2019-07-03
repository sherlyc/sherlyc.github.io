import { IContentBlock } from 'common/__types__/IContentBlock';
import { handlerRunnerFunction } from '../runner';
import { IParams } from 'server-src/services/__types__/IParams';
import { IDefconArticleListHandlerInput } from '../__types__/IDefconArticleListHandlerInput';

export default async function(
  handlerRunner: handlerRunnerFunction,
  { strapName, totalBasicArticlesUnit = 0 }: IDefconArticleListHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return [];
}
