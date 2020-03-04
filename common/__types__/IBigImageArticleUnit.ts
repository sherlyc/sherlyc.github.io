import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";
import { ImageLayoutType } from "./ImageLayoutType";

export interface IBigImageArticleUnit extends IArticle {
  type: ContentBlockType.BigImageArticleUnit;
  layout: ImageLayoutType;
  pumped?: boolean;
  identifierColor?: string;
}
