import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export enum BigImageArticleUnitLayout {
  default = "default",
  module = "module"
}

export interface IBigImageArticleUnit extends IArticle {
  type: ContentBlockType.BigImageArticleUnit;
  layout: BigImageArticleUnitLayout;
  pumped?: boolean;
}
