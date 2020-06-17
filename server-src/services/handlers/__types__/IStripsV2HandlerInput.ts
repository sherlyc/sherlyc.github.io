import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";
import { AccentColor } from "../../../../common/__types__/AccentColor";

export interface IStripsV2HandlerInput {
  type: HandlerInputType.StripsV2;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: Strap;
  sourceId: Strap;
  articleCount: number;
}
