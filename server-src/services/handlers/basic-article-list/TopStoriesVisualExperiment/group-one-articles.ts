import { IRawArticle } from '../../../adapters/__types__/IRawArticle';
import { ContentBlockType } from '../../../../../common/__types__/ContentBlockType';
import { IContentBlock } from '../../../../../common/__types__/IContentBlock';
import { IBasicAdUnit } from '../../../../../common/__types__/IBasicAdUnit';
import { IBigImageArticleUnit } from '../../../../../common/__types__/IBigImageArticleUnit';

const basicAdUnit: IBasicAdUnit = {
  type: ContentBlockType.BasicAdUnit
};

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
    (final, article) => {
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
    [basicAdUnit] as IContentBlock[]
  );
};
