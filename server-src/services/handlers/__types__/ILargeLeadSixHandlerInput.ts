import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ILargeLeadSixHandlerInput {
  type: HandlerInputType.LargeLeadSix;
  displayName: string;
  color: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
