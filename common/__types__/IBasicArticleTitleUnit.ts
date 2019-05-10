import { ContentBlockType } from './ContentBlockType';

export interface IBasicArticleTitleUnit {
  type: ContentBlockType.BasicArticleTitleUnit;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  lastPublishedTime: number;
  headlineFlags: string[];
}
