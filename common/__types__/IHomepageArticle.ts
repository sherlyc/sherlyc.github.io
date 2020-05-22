import { ContentBlockType } from "./ContentBlockType";
import { HeadlineFlags } from "../HeadlineFlags";

export enum Orientation {
  Portrait = "portrait",
  Landscape = "landscape"
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
  orientation: {
    mobile: Orientation;
    tablet: Orientation;
    desktop: Orientation;
  };
}
