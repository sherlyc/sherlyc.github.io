import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IImageVariant } from "./IImageVariant";
import { JsonFeedAssetType } from "./JsonFeedAssetType";

export interface IJsonFeedArticle {
  [key: string]: any;
  id: number;
  asset_type: JsonFeedAssetType.ARTICLE;
  headline_flags: HeadlineFlags[];
  sponsored: boolean;
  path: string;
  title: string;
  alt_headline: string;
  byline: string;
  isHeadlineOverrideApplied: boolean;
  datetime_iso8601: string;
  alt_intro: string;
  images?: Array<{
    [key: string]: any;
    variants?: IImageVariant[];
  }>;
  identifier: string;
  "category-description"?: string;
  "section-home": string;
}
