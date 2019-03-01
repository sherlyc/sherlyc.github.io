import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicArticleSectionHandlerInput } from './__types__/IBasicArticleSectionHandlerInput';
import { handlerRunnerFunction } from './runner';

export default async function(
  handlerRunner: handlerRunnerFunction,
  {
    displayName,
    displayNameColor,
    linkUrl,
    articleList: { sectionId, totalArticles }
  }: IBasicArticleSectionHandlerInput
): Promise<IContentBlock[]> {
  try {
    return [
      {
        type: ContentBlockType.BasicArticleSection,
        displayName,
        displayNameColor,
        linkUrl,
        items: await handlerRunner({
          type: 'ArticleList',
          sectionId,
          totalArticles
        })
      },
      { type: ContentBlockType.BasicAdUnit }
    ];
  } catch (e) {
    return [];
  }
}
