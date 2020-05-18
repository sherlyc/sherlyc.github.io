import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";
import { AspectRatio } from "../AspectRatio";

export interface IFeaturedArticle extends IArticle {
  type: ContentBlockType.FeaturedArticle;
  boxColor: string;
  textColor: string;
  applyGradient?: boolean;
  pumped?: boolean;
  imageAspectRatio?: AspectRatio;
}
