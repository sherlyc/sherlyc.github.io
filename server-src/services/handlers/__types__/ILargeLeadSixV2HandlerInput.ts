import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";
import { AccentColor } from "../../../../common/__types__/AccentColor";

export interface ILargeLeadSixV2HandlerInput {
  type: HandlerInputType.LargeLeadSixV2;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
