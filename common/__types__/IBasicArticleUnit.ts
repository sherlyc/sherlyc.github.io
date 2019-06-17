import { ContentBlockType } from './ContentBlockType';

export interface IBasicArticleUnit {
  type: ContentBlockType.BasicArticleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  author: string;
  publisher: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}
