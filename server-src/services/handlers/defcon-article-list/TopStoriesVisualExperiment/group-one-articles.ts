import { IRawArticle } from '../../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IBasicAdUnit } from '../../../../../common/__types__/IBasicAdUnit';
import { IGrayDefconArticleUnit } from '../../../../../common/__types__/IGrayDefconArticleUnit';
import { IBigImageArticleUnit } from '../../../../../common/__types__/IBigImageArticleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const grayDefconArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.GrayDefconArticleUnit
): IGrayDefconArticleUnit => ({
  type,
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
  strapName: string,
  type: ContentBlockType.BigImageArticleUnit
): IBigImageArticleUnit => ({
  type,
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

export const groupOneArticles = (rawArticles: IRawArticle[], strapName: string) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          grayDefconArticleUnit(
            article,
            strapName,
            ContentBlockType.GrayDefconArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        bigImageArticleUnit(
          article,
          strapName,
          ContentBlockType.BigImageArticleUnit
        ),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );
};
