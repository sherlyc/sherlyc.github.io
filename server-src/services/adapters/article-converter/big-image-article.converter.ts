import { IRawArticle } from "../__types__/IRawArticle";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

export const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  sixteenByNineSrc: article.sixteenByNineSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});
