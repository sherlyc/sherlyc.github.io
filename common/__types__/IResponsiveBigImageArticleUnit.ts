import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export interface IResponsiveBigImageArticleUnit extends IArticle {
  type: ContentBlockType.ResponsiveBigImageArticleUnit;
}
