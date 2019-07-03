import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ITopStoriesHandlerInput } from '../__types__/ITopStoriesHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../../services/__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';
import { ListAsset } from '../../../services/listAsset';
import { layoutRetriever } from '../../../services/adapters/layout-retriever';
import { LayoutType } from '../../../services/adapters/__types__/LayoutType';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    strapName,
    totalBasicArticlesUnit = 0,
    totalBasicArticleTitleUnit = 0
  }: ITopStoriesHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
  const layout = await layoutRetriever(params);
  if (layout === LayoutType.DEFAULT) {
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
  if (layout === LayoutType.DEFCON) {
    return handlerRunner(
      {
        type: HandlerInputType.DefconArticleList,
        sourceId: ListAsset.TopStories,
        strapName,
        totalBasicArticlesUnit
      },
      params
    );
  }
  return [];
}
