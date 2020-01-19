import { HandlerInputType } from "./HandlerInputType";

export interface IForceUpdateHandlerInput {
  type: HandlerInputType.ForceUpdate;
  forceUpdateOnVersionsBefore: string;
}
