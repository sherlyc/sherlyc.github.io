import { ContentBlockType } from './ContentBlockType';

export interface IBasicTitleArticle {
  type: ContentBlockType.BasicTitleArticle;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  lastPublishedTime: number;
  headlineFlags: string[];
}
