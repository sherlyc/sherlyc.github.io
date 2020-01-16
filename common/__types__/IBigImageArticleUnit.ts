import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export interface IBigImageArticleUnit extends IArticle {
  type: ContentBlockType.BigImageArticleUnit;
}
