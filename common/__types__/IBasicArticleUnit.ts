import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export interface IBasicArticleUnit extends IArticle {
  type: ContentBlockType.BasicArticleUnit;
}
