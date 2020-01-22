import { IArticle } from "./IArticle";
import { ContentBlockType } from "./ContentBlockType";

export interface IFeatureArticle extends IArticle {
  type: ContentBlockType.FeatureArticle;
  boxColor: string;
  textColor: string;
  applyGradient?: boolean;
}
