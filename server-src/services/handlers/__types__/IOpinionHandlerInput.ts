import { HandlerInputType } from "./HandlerInputType";

export interface IOpinionHandlerInput {
  type: HandlerInputType.Opinion;
  strapName: string;
  displayName: string;
  linkUrl: string;
}
