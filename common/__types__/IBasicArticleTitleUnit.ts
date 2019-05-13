import { ContentBlockType } from './ContentBlockType';

export interface IBasicArticleTitleUnit {
  type: ContentBlockType.BasicArticleTitleUnit;
  indexHeadline: string;
  linkUrl: string;
  lastPublishedTime: number;
  headlineFlags: string[];
}
