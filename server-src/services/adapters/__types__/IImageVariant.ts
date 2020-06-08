import { JsonFeedImageType } from "./JsonFeedImageType";

export interface IImageVariant {
  [key: string]: any;
  src: string;
  urls: {
    [key: string]: string;
  };
  image_type_id: JsonFeedImageType;
}
