import { AccentColor } from "../../../../common/__types__/AccentColor";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IEditorsPicksHandlerInput {
  type: HandlerInputType.EditorsPicks;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
