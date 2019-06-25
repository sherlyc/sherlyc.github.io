import { ContentBlockType } from './ContentBlockType';

export interface IImageLinkUnit {
  type: ContentBlockType.ImageLinkUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  linkUrl: string;
  imageSrc: string | null;
  imageSrcSet: string | null;
  headlineFlags: string[];
}
