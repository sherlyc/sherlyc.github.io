import { AccentColor } from "../../../../common/__types__/AccentColor";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ILargeLeadSixV2HandlerInput {
  type: HandlerInputType.LargeLeadSixV2;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
