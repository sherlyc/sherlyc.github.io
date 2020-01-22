import { IArticle } from "./IArticle";
import { ContentBlockType } from "./ContentBlockType";

export interface IFeaturedArticle extends IArticle {
  type: ContentBlockType.FeaturedArticle;
  boxColor: string;
  textColor: string;
  applyGradient?: boolean;
}
