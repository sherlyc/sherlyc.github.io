import { HandlerInputType } from "./HandlerInputType";
import { IExternalContentDeviceConfig } from "../../../../common/__types__/IExternalContentUnit";

export interface IExternalContentHandlerInput {
  type: HandlerInputType.ExternalContent;
  url: string;
  mobile: IExternalContentDeviceConfig;
  tablet?: IExternalContentDeviceConfig;
  desktop?: IExternalContentDeviceConfig;
}
