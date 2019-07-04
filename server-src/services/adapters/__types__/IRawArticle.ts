import { HeadlineFlags } from '../../../../common/HeadlineFlags';

export interface IRawArticle {
  id: string;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  imageSrcSet: string | null;
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
}
