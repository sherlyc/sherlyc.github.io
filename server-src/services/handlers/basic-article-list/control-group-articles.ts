import { IRawArticle } from '../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../common/__types__/IContentBlock';
import { IBasicArticleUnit } from '../../../../common/__types__/IBasicArticleUnit';
import { IBasicAdUnit } from '../../../../common/__types__/IBasicAdUnit';
import { IBasicArticleTitleUnit } from '../../../../common/__types__/IBasicArticleTitleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

const basicArticleTitleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
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
  strapName: strapName,
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
  totalBasicArticleUnits: number,
  strapName: string
) => {
  return rawArticles.reduce(
    (final, article, index) => {
      if (index < totalBasicArticleUnits) {
        return [
          ...final,
          basicArticleUnit(
            article,
            strapName,
            ContentBlockType.BasicArticleUnit
          ),
          basicAdUnit
        ];
      }
      return [
        ...final,
        basicArticleTitleUnit(article, strapName),
        basicAdUnit
      ];
    },
    [basicAdUnit] as IContentBlock[]
  );
};
