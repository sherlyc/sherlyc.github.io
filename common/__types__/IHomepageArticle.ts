import { HeadlineFlags } from "../HeadlineFlags";
import { AccentColor } from "./AccentColor";
import { ContentBlockType } from "./ContentBlockType";

export enum Orientation {
  Portrait = "portrait",
  Landscape = "landscape"
}

export interface IHomepageArticle {
  type: ContentBlockType.HomepageArticle;
  id: string;
  headline: string;
  color: AccentColor;
  linkUrl: string;
  headlineFlags: HeadlineFlags[];
  lastPublishedTime?: number;
  introText?: string;
  imageSrc?: string;
  category: {
    name: string;
    url: string;
  };
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
