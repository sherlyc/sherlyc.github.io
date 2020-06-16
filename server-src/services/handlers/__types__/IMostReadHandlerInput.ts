import { HandlerInputType } from "./HandlerInputType";

export interface IMostReadHandlerInput {
  type: HandlerInputType.MostRead;
  displayName: string;
  strapName: string;
}
