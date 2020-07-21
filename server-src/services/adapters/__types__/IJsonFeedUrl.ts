import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IJsonFeedImage } from "./IJsonFeedImage";
import { JsonFeedAssetType } from "./JsonFeedAssetType";

export interface IJsonFeedUrl {
  [key: string]: any;
  id: string;
  asset_type: JsonFeedAssetType.URL;
  byline: string;
  headline_flags: HeadlineFlags[];
  path: string;
  title: string;
  alt_headline: string;
  alt_intro: string;
  isHeadlineOverrideApplied: boolean;
  url: string;
  images?: IJsonFeedImage[];
  image_overrides?: IJsonFeedImage[];
  datetime_iso8601: string;
  identifier: string;
  "category-description"?: string;
  "section-home": string;
}
