import { ContentBlockType } from './ContentBlockType';

export interface IImageLinkUnit {
  type: ContentBlockType.ImageLinkUnit;
  indexHeadline: string;
  linkUrl: string;
  imageSrc: string | null;
  headlineFlags: string[];
}
