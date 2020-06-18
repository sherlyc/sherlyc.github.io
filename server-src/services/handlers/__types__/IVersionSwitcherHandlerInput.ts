import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface IVersionSwitcherHandlerInput {
  type: HandlerInputType.VersionSwitcher;
  compatibleVersion: string;
  compatibleHandler: HandlerInput;
  fallbackHandler: HandlerInput;
}
