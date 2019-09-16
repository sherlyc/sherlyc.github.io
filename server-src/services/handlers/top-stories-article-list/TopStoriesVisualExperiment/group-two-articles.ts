import { IRawArticle } from '../../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IBasicAdUnit } from '../../../../../common/__types__/IBasicAdUnit';
import { IGrayDefconArticleUnit } from '../../../../../common/__types__/IGrayDefconArticleUnit';
import { IBigImageArticleUnit } from '../../../../../common/__types__/IBigImageArticleUnit';
import { IHalfWidthImageArticleUnit } from '../../../../../common/__types__/IHalfWidthImageArticleUnit';

const basicAdUnit = (context: string): IBasicAdUnit => ({
  type: ContentBlockType.BasicAdUnit,
  context
});

const grayDefconArticleUnit = (
  article: IRawArticle,
  strapName: string
): IGrayDefconArticleUnit => ({
  type: ContentBlockType.GrayDefconArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.defconSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

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
      if (index === 0) {
        return [
          ...final,
          grayDefconArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }

      if (index === 1 || index === 2) {
        return [
          ...final,
          bigImageArticleUnit(article, strapName),
          basicAdUnit(strapName)
        ];
      }

      return [
        ...final,
        halfWidthImageArticleUnit(article, strapName),
        basicAdUnit(strapName)
      ];
    },
    [] as IContentBlock[]
  );
};
