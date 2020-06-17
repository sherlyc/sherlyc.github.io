import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IBasicArticleTitleUnit } from "../../../../common/__types__/IBasicArticleTitleUnit";
import { IRawArticle } from "../__types__/IRawArticle";

export const basicArticleTitleUnit = (
  article: IRawArticle,
  strapName: string,
  identifierColor?: string
): IBasicArticleTitleUnit => ({
  type: ContentBlockType.BasicArticleTitleUnit,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  identifier: article.identifier,
  identifierColor
});
