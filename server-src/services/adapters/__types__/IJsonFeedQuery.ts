import { JsonFeedAssetType } from "./JsonFeedAssetType";

export interface IJsonFeedQuery {
  [key: string]: any;
  id: number;
  asset_type: JsonFeedAssetType.QUERY;
  datetime_iso8601: string;
}
