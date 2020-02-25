import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IArticleTitle } from "../../../../common/__types__/IArticleTitle";

export const articleTitle = (
  article: IRawArticle,
  strapName: string,
  showTimestamp: boolean,
  position?: string
): IArticleTitle => ({
  type: ContentBlockType.ArticleTitle,
  id: article.id,
  strapName: strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  showTimestamp,
  position
});
