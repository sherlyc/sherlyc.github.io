import { IRawArticle } from "../__types__/IRawArticle";
import { ContentBlockType } from "../../../../common/__types__/ContentBlockType";
import { IHalfImageArticleWithoutIntroUnit } from "../../../../common/__types__/IHalfImageArticleWithoutIntroUnit";

export const halfImageArticleWithoutIntroUnit = (
  article: IRawArticle,
  strapName: string
): IHalfImageArticleWithoutIntroUnit => ({
  type: ContentBlockType.HalfImageArticleWithoutIntroUnit,
  id: article.id,
  strapName,
  indexHeadline: article.indexHeadline,
  title: article.title,
  imageSrc: article.sixteenByNineSrc,
  linkUrl: article.linkUrl,
  lastPublishedTime: article.lastPublishedTime,
  headlineFlags: article.headlineFlags
});
