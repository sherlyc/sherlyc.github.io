import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";

export interface IFeaturedArticle extends IArticle {
  type: ContentBlockType.FeaturedArticle;
  boxColor: string;
  textColor: string;
  applyGradient?: boolean;
  pumped?: boolean;
  imageRatio?: string;
}
