import { ContentBlockType } from "./ContentBlockType";
import { IArticle } from "./IArticle";
import { ImageLayoutType } from "./ImageLayoutType";

export interface IImageLinkUnit extends IArticle {
  type: ContentBlockType.ImageLinkUnit;
  layout: ImageLayoutType;
}
