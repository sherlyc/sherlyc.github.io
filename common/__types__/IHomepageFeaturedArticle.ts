import { JsonFeedImageType } from "../../server-src/services/adapters/__types__/JsonFeedImageType";
import { AspectRatio } from "../AspectRatio";
import { HeadlineFlags } from "../HeadlineFlags";
import { AccentColor } from "./AccentColor";
import { ContentBlockType } from "./ContentBlockType";

export enum HomepageFeaturedArticleVariation {
  Lead = "Lead",
  Featured = "Featured"
}

export interface IHomepageFeaturedArticleImageDeviceConfig {
  variant: JsonFeedImageType;
  aspectRatio: AspectRatio;
}

export interface IHomepageFeaturedArticleImage {
  src: string | null;
  aspectRatio: AspectRatio;
}

export interface IHomepageFeaturedArticleImageConfig {
  mobile?: IHomepageFeaturedArticleImage;
  tablet?: IHomepageFeaturedArticleImage;
  desktop?: IHomepageFeaturedArticleImage;
}

export interface IHomepageFeaturedArticle {
  type: ContentBlockType.HomepageFeaturedArticle;
  id: string;
  headline: string;
  color: AccentColor.TopStoriesBlue;
  linkUrl: string;
  headlineFlags: HeadlineFlags[];
  lastPublishedTime?: number;
  introText?: string;
  image: IHomepageFeaturedArticleImageConfig;
  variation: HomepageFeaturedArticleVariation;
  category: {
    name: string;
    url: string;
  };
  analytics: {
    strapName: string;
    title: string;
  };
}
