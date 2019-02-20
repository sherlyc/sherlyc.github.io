import handlerRunner from './runner';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicArticleSectionHandlerInput } from './__types__/IBasicArticleSectionHandlerInput';

export default async function({
  displayName,
  displayNameColor,
  linkUrl,
  articleList: { sectionId, totalArticles }
}: IBasicArticleSectionHandlerInput): Promise<IContentBlock[]> {
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
      }
    ];
  } catch (e) {
    return [];
  }
}
