import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface IHalfFourHandlerInput {
  type: HandlerInputType.HalfFour;
  displayName: string;
  color: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
