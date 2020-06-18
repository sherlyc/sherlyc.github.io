import { AccentColor } from "../../../../common/__types__/AccentColor";
import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IStripsV2HandlerInput {
  type: HandlerInputType.StripsV2;
  displayName: string;
  color: AccentColor;
  linkUrl?: string;
  strapName: Strap;
  sourceId: Strap;
  articleCount: number;
}
