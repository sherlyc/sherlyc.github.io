import { ContentBlockType } from "./ContentBlockType";
import { HeadlineFlags } from "../HeadlineFlags";

export interface IArticleTitle {
  type: ContentBlockType.ArticleTitle;
  id: string;
  strapName: string;
  indexHeadline: string;
  title: string;
  linkUrl: string;
  lastPublishedTime: number;
  headlineFlags: HeadlineFlags[];
  position?: string;
  showTimestamp: boolean;
}
