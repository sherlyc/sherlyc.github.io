import { IArticle } from "./IArticle";
import { ContentBlockType } from "./ContentBlockType";

export interface ITextBoxArticle extends IArticle {
  type: ContentBlockType.TextBoxArticle;
}
