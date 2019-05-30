import { ContentBlockType } from './ContentBlockType';

export interface IBasicArticleUnit {
  type: ContentBlockType.BasicArticleUnit;
  id: string;
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}
