import { AccentColor } from "../../../../common/__types__/AccentColor";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IHalfFourHandlerInput {
  type: HandlerInputType.HalfFour;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
