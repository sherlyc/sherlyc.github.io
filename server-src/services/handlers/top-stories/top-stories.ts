import { IContentBlock } from 'common/__types__/IContentBlock';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../../services/__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { ListAsset } from '../../../services/listAsset';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    strapName,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0
  }: ITopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  return handlerRunner(
    {
      type: HandlerInputType.ArticleList,
      sourceId: ListAsset.TopStories,
      strapName,
      totalBasicArticlesUnit,
      totalBasicArticleTitleUnit
    },
    params
  );
}
