import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IDarkGradientArticle } from "../../../../common/__types__/IDarkGradientArticle";

export const darkGradientArticle = (
  article: IRawArticle,
  strapName: string
): IDarkGradientArticle => ({
  type: ContentBlockType.DarkGradientArticle,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  imageSrc: article.imageSrc,
  imageSrcSet: article.imageSrcSet,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});
