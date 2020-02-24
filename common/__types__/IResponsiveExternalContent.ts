import { ContentBlockType } from "./ContentBlockType";

export interface IResponsiveExternalContent {
  type: ContentBlockType.ResponsiveExternalContent;
  url: string;
  scrollable?: boolean;
  mobile: IResponsiveExternalContentDeviceConfig;
  tablet?: IResponsiveExternalContentDeviceConfig;
  desktop?: IResponsiveExternalContentDeviceConfig;
}

export interface IResponsiveExternalContentDeviceConfig {
  width: string;
  height: string;
  margin: string;
}
