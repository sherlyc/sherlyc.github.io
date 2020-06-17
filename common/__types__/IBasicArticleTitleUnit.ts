import { HeadlineFlags } from "../HeadlineFlags";
import { ContentBlockType } from "./ContentBlockType";

export interface IBasicArticleTitleUnit {
  type: ContentBlockType.BasicArticleTitleUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  title: string;
  linkUrl: string;
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
  identifier?: string;
  identifierColor?: string;
}
