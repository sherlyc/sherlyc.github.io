import { ContentBlockType } from "./ContentBlockType";
import { HeadlineFlags } from "../HeadlineFlags";

export enum Orientation {
  Portrait = "column",
  Landscape = "row"
}

export interface IHomepageArticle {
  type: ContentBlockType.HomepageArticle;
  id: string;
  headline: string;
  linkUrl: string;
  headlineFlags: HeadlineFlags[];
  lastPublishedTime?: number;
  introText?: string;
  imageSrc?: string;
  category?: string;
  analytics: {
    strapName: string;
    title: string;
  };
  display: {
    mobile: Orientation;
    tablet?: Orientation;
    desktop?: Orientation;
  };
}
