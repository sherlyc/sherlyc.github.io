import { JsonFeedImageType } from "../../server-src/services/adapters/__types__/JsonFeedImageType";
import { AspectRatio } from "../AspectRatio";
import { HeadlineFlags } from "../HeadlineFlags";
import { AccentColor } from "./AccentColor";
import { ContentBlockType } from "./ContentBlockType";

export enum HomepageHighlightArticleVariation {
  Lead = "Lead",
  Featured = "Featured"
}

export interface IHomepageHighlightArticleImageConfig {
  variant: JsonFeedImageType;
  aspectRatio: AspectRatio;
}

export interface IHomepageHighlightArticleImageConfigs {
  mobile?: IHomepageHighlightArticleImageConfig;
  tablet?: IHomepageHighlightArticleImageConfig;
  desktop?: IHomepageHighlightArticleImageConfig;
}

export interface IHomepageHighlightArticleImage {
  src: string;
  aspectRatio: AspectRatio;
}

export interface IHomepageHighlightArticleImages {
  mobile?: IHomepageHighlightArticleImage;
  tablet?: IHomepageHighlightArticleImage;
  desktop?: IHomepageHighlightArticleImage;
}

export interface IHomepageHighlightArticle {
  type: ContentBlockType.HomepageHighlightArticle;
  id: string;
  headline: string;
  color: AccentColor;
  linkUrl: string;
  headlineFlags: HeadlineFlags[];
  lastPublishedTime?: number;
  introText?: string;
  image: IHomepageHighlightArticleImages;
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
