import { JsonFeedImageType } from './JsonFeedImageType';
import { JsonFeedAssetType } from './JsonFeedAssetType';
import { HeadlineFlags } from '../../../../common/__types__/HeadlineFlags';

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
    variants?: Array<{
      [key: string]: any;
      src: string;
      layout: JsonFeedImageType;
    }>;
  }>;
  datetime_iso8601: string;
}
