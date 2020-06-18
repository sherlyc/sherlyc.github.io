import { IBulletItem } from "../../../../common/__types__/IBulletItem";
import { IRawArticle } from "../__types__/IRawArticle";

export const bulletItem = (
  article: IRawArticle,
  strapName: string,
  bulletColor: string
): IBulletItem => ({
  id: article.id,
  strapName,
  linkText: article.indexHeadline,
  linkUrl: article.linkUrl,
  bulletColor
});
