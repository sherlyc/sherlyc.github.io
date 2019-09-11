import { IRawArticle } from '../../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IBasicAdUnit } from '../../../../../common/__types__/IBasicAdUnit';
import { IBigImageArticleUnit } from '../../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../../common/__types__/IHalfWidthImageArticleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

const halfWidthImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IHalfWidthImageArticleUnit => ({
  type: ContentBlockType.HalfWidthImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export const groupTwoArticles = (
  rawArticles: IRawArticle[],
  strapName: string
) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index < 3) {
        return [...final, bigImageArticleUnit(article, strapName), basicAdUnit];
      }
      return [
        ...final,
        halfWidthImageArticleUnit(article, strapName),
        basicAdUnit
      ];
    },
    [basicAdUnit] as IContentBlock[]
  );
};