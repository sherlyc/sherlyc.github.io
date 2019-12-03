import { ContentBlockType } from "./ContentBlockType";

export interface IGrayDefconArticleUnit {
  type: ContentBlockType.GrayDefconArticleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  title: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  lastPublishedTime: number;
  headlineFlags: string[];
}
