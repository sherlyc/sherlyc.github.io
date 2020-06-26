import { IImageVariant } from "./IImageVariant";

export interface IJsonFeedImage {
  [key: string]: any;
  variants?: IImageVariant[];
}
