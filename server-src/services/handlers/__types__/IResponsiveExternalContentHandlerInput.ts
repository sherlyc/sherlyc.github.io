import { IResponsiveExternalContentDeviceConfig } from "../../../../common/__types__/IResponsiveExternalContent";
import { HandlerInputType } from "./HandlerInputType";

export interface IResponsiveExternalContentHandlerInput {
  type: HandlerInputType.ResponsiveExternalContent;
  url: string;
  scrollable?: boolean;
  lazyLoad?: boolean;
  mobile: IResponsiveExternalContentDeviceConfig;
  tablet?: IResponsiveExternalContentDeviceConfig;
  desktop?: IResponsiveExternalContentDeviceConfig;
}
