import { IContentBlock } from '../../../common/__types__/IContentBlock';
import getRawArticleList from '../adapters/jsonfeed';
import handlerRunner, { HandlerType } from './runner';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { Section } from '../section';
import { IBasicArticleSection } from '../../../common/__types__/IBasicArticleSection';

export interface IBasicArticleSectionHandlerInput {
  displayName: string;
  displayNameColor: string;
  linkUrl: string;
  sectionId: Section;
  revert: boolean;
  totalArticles: number;
}

export default async function({
  displayName,
  displayNameColor,
  linkUrl,
  sectionId,
  revert,
  totalArticles
}: IBasicArticleSectionHandlerInput): Promise<IContentBlock[]> {
  try {
    return [
      {
        type: ContentBlockType.BasicArticleSection,
        displayName,
        displayNameColor,
        linkUrl,
        items: (await handlerRunner(HandlerType.ArticleList, {
          rawArticles: (await getRawArticleList(
            sectionId,
            totalArticles
          )).splice(0, totalArticles)
        })) as IBasicArticleUnit[]
      } as IBasicArticleSection
    ];
  } catch (e) {
    return [];
  }
}
