import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IDefconArticleUnit } from "../../../../common/__types__/IDefconArticleUnit";
import { IRawArticle } from "../__types__/IRawArticle";

export const defconArticleUnit = (
  article: IRawArticle,
  strapName: string
): IDefconArticleUnit => ({
  type: ContentBlockType.DefconArticleUnit,
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
