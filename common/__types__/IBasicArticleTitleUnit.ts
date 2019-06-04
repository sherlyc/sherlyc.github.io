import { ContentBlockType } from './ContentBlockType';

export interface IBasicArticleTitleUnit {
  type: ContentBlockType.BasicArticleTitleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  linkUrl: string;
  lastPublishedTime: number;
  headlineFlags: string[];
}
