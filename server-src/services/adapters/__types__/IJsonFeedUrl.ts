import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IImageVariant } from "./IImageVariant";
import { JsonFeedAssetType } from "./JsonFeedAssetType";

export interface IJsonFeedUrl {
  id: string;
  asset_type: JsonFeedAssetType.URL;
  headline_flags: HeadlineFlags[];
  path: string;
  title: string;
  alt_headline: string;
  alt_intro: string;
  isHeadlineOverrideApplied: boolean;
  url: string;
  images?: Array<{
    [key: string]: any;
    variants?: IImageVariant[];
  }>;
  datetime_iso8601: string;
  identifier: string;
  "section-home": string;
}
