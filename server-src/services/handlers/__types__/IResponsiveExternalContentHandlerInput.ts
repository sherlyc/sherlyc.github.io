import { HandlerInputType } from "./HandlerInputType";
import { IResponsiveExternalContentDeviceConfig } from "../../../../common/__types__/IResponsiveExternalContent";

export interface IResponsiveExternalContentHandlerInput {
  type: HandlerInputType.ResponsiveExternalContent;
  url: string;
  scrollable?: boolean;
  lazyLoad?: boolean;
  mobile: IResponsiveExternalContentDeviceConfig;
  tablet?: IResponsiveExternalContentDeviceConfig;
  desktop?: IResponsiveExternalContentDeviceConfig;
}
