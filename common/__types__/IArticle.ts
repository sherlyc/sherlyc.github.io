import { HeadlineFlags } from "../HeadlineFlags";

export interface IArticle {
  id: string;
  strapName: string;
  indexHeadline: string;
  title: string;
  introText: string;
  linkUrl: string;
  imageSrc: string | null;
  imageSrcSet: string | null;
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
  identifier?: string;
  identifierColor?: string;
}
