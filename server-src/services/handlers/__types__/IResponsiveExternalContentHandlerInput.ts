import { HandlerInputType } from "./HandlerInputType";
import { IResponsiveExternalContentDeviceConfig } from "../../../../common/__types__/IResponsiveExternalContent";

export interface IResponsiveExternalContentHandlerInput {
  type: HandlerInputType.ResponsiveExternalContent;
  url: string;
  mobile: IResponsiveExternalContentDeviceConfig;
  tablet?: IResponsiveExternalContentDeviceConfig;
  desktop?: IResponsiveExternalContentDeviceConfig;
}
