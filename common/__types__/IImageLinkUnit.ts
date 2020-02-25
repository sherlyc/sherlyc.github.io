import { ContentBlockType } from "./ContentBlockType";
import { HeadlineFlags } from "../HeadlineFlags";
import { ImageLayoutType } from "./ImageLayoutType";

export interface IImageLinkUnit {
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
