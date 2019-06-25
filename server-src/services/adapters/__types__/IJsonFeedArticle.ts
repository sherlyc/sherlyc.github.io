import { JsonFeedAssetType } from './JsonFeedAssetType';
import { IImageVariant } from './IImageVariant';
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
    variants?: IImageVariant[];
  }>;
}
