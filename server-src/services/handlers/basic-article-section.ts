import handlerRunner from './runner';
import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicArticleListHandlerInput } from './basic-article-list';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IBasicArticleSectionHandlerInput {
  type: 'ArticleSection';
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  articleList: Omit<IBasicArticleListHandlerInput, 'type'>;
}

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
