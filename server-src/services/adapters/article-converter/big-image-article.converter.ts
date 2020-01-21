import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import {
  BigImageArticleUnitLayout,
  IBigImageArticleUnit
} from "../../../../common/__types__/IBigImageArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";

export const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string,
  layout: BigImageArticleUnitLayout = BigImageArticleUnitLayout.default
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc:
    layout === BigImageArticleUnitLayout.default
      ? article.strapImageSrc
      : article.sixteenByNineSrc,
  imageSrcSet: article.strapImageSrcSet,
  layout,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});
