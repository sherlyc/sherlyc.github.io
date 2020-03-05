import { IRawArticle } from "../__types__/IRawArticle";
import { IResponsiveBigImageArticleUnit } from "../../../../common/__types__/IResponsiveBigImageArticleUnit";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";

export const responsiveBigImageArticleUnit = (
  article: IRawArticle,
  strapName: string,
  identifierColor?: string
): IResponsiveBigImageArticleUnit => ({
  type: ContentBlockType.ResponsiveBigImageArticle,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.strapImageSrc,
  imageSrcSet: article.strapImageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  identifier: article.identifier,
  identifierColor
});
