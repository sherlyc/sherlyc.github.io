import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IBasicArticleSectionHandlerInput } from '../__types__/IBasicArticleSectionHandlerInput';
import { handlerRunnerFunction } from '../runner';
import { IParams } from '../../__types__/IParams';
import { HandlerInputType } from '../__types__/HandlerInputType';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
    linkUrl,
    articleList: {
      sourceId,
      strapName,
      totalBasicArticlesUnit,
      totalBasicArticleTitleUnit
    }
  }: IBasicArticleSectionHandlerInput,
  params: IParams
): Promise<IContentBlock[]> {
    return [
      {
        type: ContentBlockType.BasicArticleSection,
        displayName,
        displayNameColor,
        linkUrl,
        items: await handlerRunner(
          {
            type: HandlerInputType.ArticleList,
            sourceId,
            strapName,
            totalBasicArticlesUnit,
            totalBasicArticleTitleUnit
          },
          params
        )
      },
      { type: ContentBlockType.BasicAdUnit }
    ];
}
