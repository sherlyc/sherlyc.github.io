import { IRawArticle } from "../__types__/IRawArticle";
import { IHalfWidthImageArticleUnit } from "../../../../common/__types__/IHalfWidthImageArticleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

export const halfWidthImageArticleUnit = (
  article: IRawArticle,
  strapName: string
): IHalfWidthImageArticleUnit => ({
  type: ContentBlockType.HalfWidthImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});