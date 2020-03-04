import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export interface IHalfWidthImageArticleUnit extends IArticle {
  type: ContentBlockType.HalfWidthImageArticleUnit;
}
