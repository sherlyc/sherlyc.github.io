import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleUnit } from "../../../../common/__types__/IBasicArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";

export const basicArticleUnit = (
  article: IRawArticle,
  strapName: string
): IBasicArticleUnit => ({
  type: ContentBlockType.BasicArticleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});
