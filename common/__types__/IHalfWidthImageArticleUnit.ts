import { ContentBlockType } from './ContentBlockType';
import { HeadlineFlags } from '../HeadlineFlags';

export interface IHalfWidthImageArticleUnit {
  type: ContentBlockType.HalfWidthImageArticleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  imageSrcSet: string | null;
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
}
