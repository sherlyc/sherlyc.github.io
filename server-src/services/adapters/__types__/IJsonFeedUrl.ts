import { JsonFeedAssetType } from './JsonFeedAssetType';
import { IImageVariant } from './IImageVariant';

export interface IJsonFeedUrl {
  [key: string]: any;
  id: string;
  asset_type: JsonFeedAssetType.URL;
  title: string;
  alt_intro: string;
  url: string;
  images?: Array<{
    [key: string]: any;
    variants?: IImageVariant[];
  }>;
  datetime_iso8601: string;
}
