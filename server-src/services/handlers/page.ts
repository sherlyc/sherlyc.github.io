import { IContentBlock } from '../../../common/__types__/IContentBlock';
import handlerRunner, { HandlerType } from './runner';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicArticleSectionHandlerInput } from './basic-article-section';

export interface IPageHandlerInput {
  totalArticlesPerSection: number;
  sections: IBasicArticleSectionHandlerInput[];
}

export default async function({
  sections
}: IPageHandlerInput): Promise<IContentBlock[]> {
  return [
    { type: ContentBlockType.Header },
    {
      type: ContentBlockType.Container,
      items: (await Promise.all(
        sections.map((section) =>
          handlerRunner(HandlerType.ArticleSection, section)
        )
      )).reduce((final, item) => [...final, ...item], [])
    },
    { type: 'Footer' }
  ];
}
