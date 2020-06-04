import { HeadlineFlags } from "../../../../common/HeadlineFlags";
import { IImageVariant } from "./IImageVariant";
import { JsonFeedAssetType } from "./JsonFeedAssetType";

export interface IJsonFeedArticle {
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
  "section-home": string;
}
