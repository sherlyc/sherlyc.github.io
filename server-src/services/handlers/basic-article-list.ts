import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';
import { Section } from '../section';
import getRawArticleList from '../adapters/jsonfeed';

export interface IBasicArticleListHandlerInput {
  type: 'ArticleList';
  sectionId: Section;
  totalArticles: number;
}

export default async function({
  sectionId,
  totalArticles
}: IBasicArticleListHandlerInput): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };

  const rawArticles = (await getRawArticleList(sectionId, totalArticles)).slice(
    0,
    totalArticles
  );

  return rawArticles.reduce(
    (final, article) => [
      ...final,
      {
        type: ContentBlockType.BasicArticleUnit,
        indexHeadline: article.indexHeadline,
        introText: article.introText,
        imageSrc: article.imageSrc,
        linkUrl: article.linkUrl,
        lastPublishedTime: article.lastPublishedTime,
        headlineFlags: article.headlineFlags
      } as IBasicArticleUnit,
      basicAdUnit
    ],
    [basicAdUnit] as IContentBlock[]
  );
}
