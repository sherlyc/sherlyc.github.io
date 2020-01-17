import { IArticle } from "./IArticle";
import { ContentBlockType } from "./ContentBlockType";

export interface IDarkGradientArticle extends IArticle {
  type: ContentBlockType.DarkGradientArticle;
}
