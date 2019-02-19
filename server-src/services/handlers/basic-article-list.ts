import { IContentBlock } from '../../../common/__types__/IContentBlock';
import { IRawArticle } from '../adapters/__types__/IRawArticle';
import { IBasicArticleUnit } from '../../../common/__types__/IBasicArticleUnit';
import { HandlerType } from './runner';
import { ContentBlockType } from '../../../common/__types__/ContentBlockType';
import { IBasicAdUnit } from '../../../common/__types__/IBasicAdUnit';

export interface IBasicArticleListHandlerInput {
  rawArticles: IRawArticle[];
}

export default async function({
  rawArticles
}: IBasicArticleListHandlerInput): Promise<IContentBlock[]> {
  const basicAdUnit: IBasicAdUnit = {
    type: ContentBlockType.BasicAdUnit
  };
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
