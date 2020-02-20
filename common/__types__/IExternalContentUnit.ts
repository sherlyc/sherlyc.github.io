import { ContentBlockType } from "./ContentBlockType";

export interface IExternalContentUnit {
  type: ContentBlockType.ExternalContentUnit;
  url: string;
  mobile: IExternalContentDeviceConfig;
  tablet?: IExternalContentDeviceConfig;
  desktop?: IExternalContentDeviceConfig;
}

export interface IExternalContentDeviceConfig {
  width: string;
  height: string;
  margin: string;
  scrollable?: boolean;
}
