import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBigImageArticleUnit } from "../../../../common/__types__/IBigImageArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";
import { ImageLayoutType } from "../../../../common/__types__/ImageLayoutType";

export const bigImageArticleUnit = (
  article: IRawArticle,
  strapName: string,
  layout: ImageLayoutType = ImageLayoutType.default,
  pumped = false,
  identifierColor?: string
): IBigImageArticleUnit => ({
  type: ContentBlockType.BigImageArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc:
    layout === ImageLayoutType.default
      ? article.strapImageSrc
      : article.sixteenByNineSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  identifier: article.identifier,
  identifierColor,
  layout,
  pumped
});
