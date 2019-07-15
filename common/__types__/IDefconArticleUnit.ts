import { ContentBlockType } from './ContentBlockType';

export interface IDefconArticleUnit {
  type: ContentBlockType.DefconArticleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}