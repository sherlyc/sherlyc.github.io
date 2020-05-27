import { HandlerInputType } from "./HandlerInputType";
import { HandlerInput } from "./HandlerInput";

export interface IVersionSwitcherHandlerInput {
  type: HandlerInputType.VersionSwitcher;
  compatibleVersion: string;
  compatibleHandler: HandlerInput;
  fallbackHandler: HandlerInput;
}
