import { JsonFeedImageType } from "../../server-src/services/adapters/__types__/JsonFeedImageType";
import { AspectRatio } from "../AspectRatio";
import { HeadlineFlags } from "../HeadlineFlags";
import { AccentColor } from "./AccentColor";
import { ContentBlockType } from "./ContentBlockType";

export enum HomepageHighlightArticleVariation {
  Lead = "Lead",
  Featured = "Featured"
}

export interface IHomepageHighlightArticleImageDeviceConfig {
  variant: JsonFeedImageType;
  aspectRatio: AspectRatio;
}

export interface IHomepageHighlightArticleImage {
  src: string | null;
  aspectRatio: AspectRatio;
}

export interface IHomepageHighlightArticleImageConfig {
  mobile?: IHomepageHighlightArticleImage;
  tablet?: IHomepageHighlightArticleImage;
  desktop?: IHomepageHighlightArticleImage;
}

export interface IHomepageHighlightArticle {
  type: ContentBlockType.HomepageHighlightArticle;
  id: string;
  headline: string;
  color: AccentColor.TopStoriesBlue;
  linkUrl: string;
  headlineFlags: HeadlineFlags[];
  lastPublishedTime?: number;
  introText?: string;
  image: IHomepageHighlightArticleImageConfig;
  variation: HomepageHighlightArticleVariation;
  category: {
    name: string;
    url: string;
  };
  analytics: {
    strapName: string;
    title: string;
  };
}
