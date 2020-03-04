import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export interface IHalfImageArticleWithoutIntroUnit extends IArticle {
  type: ContentBlockType.HalfImageArticleWithoutIntroUnit;
  identifierColor?: string;
}
