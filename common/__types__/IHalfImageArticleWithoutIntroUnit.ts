import { ContentBlockType } from "./ContentBlockType";
import { HeadlineFlags } from "../HeadlineFlags";

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
