import { ContentBlockType } from './ContentBlockType';

export interface IExternalContentUnit {
  type: ContentBlockType.ExternalContentUnit;
  url: string;
  width: string;
  height: string;
}
