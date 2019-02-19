import { IContentBlock } from '../../../common/__types__/IContentBlock';
import handlerRunner, { HandlerType } from './runner';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';

export interface IPageHandlerInput {
  type: HandlerType.Page;
  totalArticlesPerSection: number;
  sections: string[];
}

export default async function({
  sections,
  totalArticlesPerSection
}: IPageHandlerInput): Promise<IContentBlock[]> {
  return [
    { type: ContentBlockType.Header },
    {
      type: ContentBlockType.Container,
      items: (await Promise.all(
        sections.map((sectionName) =>
          handlerRunner({
            type: HandlerType.ArticleSection,
            name: sectionName,
            sectionId: sectionName,
            revert: false,
            linkUrl: '/' + sectionName,
            totalArticles: totalArticlesPerSection
          })
        )
      )).reduce((final, item) => [...final, ...item], [])
    },
    { type: 'Footer' }
  ];
}
