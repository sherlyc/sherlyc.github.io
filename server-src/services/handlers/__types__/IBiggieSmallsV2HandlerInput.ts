import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IBiggieSmallsV2HandlerInput {
  type: HandlerInputType.BiggieSmallsV2;
  displayName: string;
  color: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
