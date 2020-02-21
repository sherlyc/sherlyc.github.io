import { HandlerInputType } from "./HandlerInputType";

export interface IExternalContentHandlerInput {
  type: HandlerInputType.ExternalContent;
  url: string;
  width: string;
  height: string;
  margin: string;
  scrollable?: boolean;
}
