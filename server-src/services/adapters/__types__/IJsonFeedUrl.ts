import { JsonFeedAssetType } from './JsonFeedAssetType';
import { IImageVariant } from './IImageVariant';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';

export interface IJsonFeedUrl {
  [key: string]: any;
  id: string;
  asset_type: JsonFeedAssetType.URL;
  headline_flags: HeadlineFlags[];
  title: string;
  alt_intro: string;
  url: string;
  images?: Array<{
    [key: string]: any;
    variants?: IImageVariant[];
  }>;
  datetime_iso8601: string;
}
