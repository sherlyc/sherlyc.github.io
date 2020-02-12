import { HeadlineFlags } from "../HeadlineFlags";
import { ContentBlockType } from "./ContentBlockType";

export interface IHalfImageArticleWithoutIntroUnit {
  type: ContentBlockType.HalfImageArticleWithoutIntroUnit;
  id: string;
  strapName: string;
  indexHeadline: string;
  title: string;
  linkUrl: string;
  imageSrc: string | null;
  headlineFlags: HeadlineFlags[];
  lastPublishedTime: number;
}
