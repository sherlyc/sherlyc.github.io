import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IGrayDefconArticleUnit } from "../../../../common/__types__/IGrayDefconArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";

export const grayDefconArticleUnit = (
  article: IRawArticle,
  strapName: string
): IGrayDefconArticleUnit => ({
  type: ContentBlockType.GrayDefconArticleUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.defconSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});
