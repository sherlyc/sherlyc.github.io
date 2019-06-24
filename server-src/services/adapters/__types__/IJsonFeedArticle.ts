import { JsonFeedAssetType } from './JsonFeedAssetType';
import { IImageVariant } from './IImageVariant';

export interface IJsonFeedArticle {
  [key: string]: any;
  id: number;
  asset_type: JsonFeedAssetType.ARTICLE;
  path: string;
  alt_headline: string;
  datetime_iso8601: string;
  alt_intro: string;
  images?: Array<{
    [key: string]: any;
    variants?: IImageVariant[];
  }>;
}
