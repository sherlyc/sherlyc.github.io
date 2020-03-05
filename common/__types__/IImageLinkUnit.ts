import { ContentBlockType } from "./ContentBlockType";
import { HeadlineFlags } from "../HeadlineFlags";
import { ImageLayoutType } from "./ImageLayoutType";
import { IArticle } from "./IArticle";

export interface IImageLinkUnit extends IArticle {
  type: ContentBlockType.ImageLinkUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  title: string;
  linkUrl: string;
  imageSrc: string | null;
  imageSrcSet: string | null;
  headlineFlags: HeadlineFlags[];
  layout: ImageLayoutType;
}
