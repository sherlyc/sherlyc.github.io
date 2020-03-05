import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHalfImageArticleWithoutIntroUnit } from "../../../../common/__types__/IHalfImageArticleWithoutIntroUnit";
import { IRawArticle } from "../__types__/IRawArticle";

export const halfImageArticleWithoutIntroUnit = (
  article: IRawArticle,
  strapName: string,
  identifierColor?: string
): IHalfImageArticleWithoutIntroUnit => ({
  type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  introText: article.introText,
  linkUrl: article.linkUrl,
  imageSrc: article.sixteenByNineSrc,
  imageSrcSet: article.imageSrcSet,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags,
  identifier: article.identifier,
  identifierColor
});
