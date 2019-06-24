import { JsonFeedImageType } from './JsonFeedImageType';
import { JsonFeedAssetType } from './JsonFeedAssetType';
import { HeadlineFlags } from '../../../../common/HeadlineFlags';

export interface IJsonFeedArticle {
  [key: string]: any;
  id: number;
  asset_type: JsonFeedAssetType.ARTICLE;
  headline_flags: HeadlineFlags[];
  path: string;
  alt_headline: string;
  datetime_iso8601: string;
  alt_intro: string;
  images?: Array<{
    [key: string]: any;
    variants?: Array<{
      [key: string]: any;
      src: string;
      layout: JsonFeedImageType;
    }>;
  }>;
}
