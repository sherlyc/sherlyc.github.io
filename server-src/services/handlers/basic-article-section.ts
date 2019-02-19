import { IContentBlock } from '../../../common/__types__/IContentBlock';
import getRawArticleList from '../adapters/jsonfeed';
import handlerRunner, { HandlerType } from './runner';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';

export interface IBasicArticleSectionHandlerInput {
  type: HandlerType.ArticleSection;
  name: string;
  linkUrl: string;
  sectionId: string;
  revert: boolean;
  totalArticles: number;
}

export default async function({
  name,
  linkUrl,
  sectionId,
  totalArticles
}: IBasicArticleSectionHandlerInput): Promise<IContentBlock[]> {
  try {
    return [
      {
        type: ContentBlockType.BasicArticleSection,
        name,
        linkUrl,
        articles: (await handlerRunner({
          type: HandlerType.ArticleList,
          rawArticles: (await getRawArticleList(
            totalArticles,
            sectionId
          )).splice(0, totalArticles)
        })) as IBasicArticleUnit[]
      }
    ];
  } catch (e) {
    return [];
  }
}
