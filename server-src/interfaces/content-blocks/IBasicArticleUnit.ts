export interface IBasicArticleUnit {
  type: 'BasicArticleUnit';
  indexHeadline: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}
