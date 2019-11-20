import { ContentBlockType } from './ContentBlockType';
import { HeadlineFlags } from '../HeadlineFlags';

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
}
