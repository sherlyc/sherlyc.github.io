import { ContentBlockType } from './ContentBlockType';

export interface IDefconArticleUnit {
  type: ContentBlockType.GrayDefconArticleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}
