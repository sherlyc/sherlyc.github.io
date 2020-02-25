import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ILargeLeadSixHandlerInput {
  type: HandlerInputType.LargeLeadSix;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
