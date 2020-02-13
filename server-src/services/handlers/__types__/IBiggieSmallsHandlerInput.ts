import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IBiggieSmallsHandlerInput {
  type: HandlerInputType.BiggieSmalls;
  displayName: string;
  displayNameColor: string;
  strapName: string;
  sourceId: Strap;
}
