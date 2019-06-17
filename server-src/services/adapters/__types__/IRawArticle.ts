export interface IRawArticle {
  id: string;
  indexHeadline: string;
  author: string;
  publisher: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}
