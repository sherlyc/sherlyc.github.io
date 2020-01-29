import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ILargeLeadSixHandlerInput {
  type: HandlerInputType.LargeLeadSix;
  sourceId: Strap;
  strapName: string;
  displayName: string;
  displayNameColor: string;
}
