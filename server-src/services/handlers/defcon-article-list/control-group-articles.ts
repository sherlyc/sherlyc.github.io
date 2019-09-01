import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { IDefconArticleUnit } from '../../../../common/__types__/IDefconArticleUnit';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const defconArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.DefconArticleUnit
): IDefconArticleUnit => ({
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

const basicArticleUnit = (
  article: IRawArticle,
  strapName: string,
  type: ContentBlockType.BasicArticleUnit
): IBasicArticleUnit => ({
  type,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});

export const controlGroupArticles = (
  rawArticles: IRawArticle[],
  strapName: string
) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index === 0) {
        return [
          ...final,
          defconArticleUnit(
            article,
            strapName,
            ContentBlockType.DefconArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        basicArticleUnit(
          article,
          strapName,
          ContentBlockType.BasicArticleUnit
        ),
        basicAdUnit
      ];
    },
    [] as IContentBlock[]
  );
};
