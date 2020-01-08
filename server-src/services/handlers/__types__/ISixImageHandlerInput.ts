import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ISixImageHandlerInput {
  type: HandlerInputType.SixImage;
  sourceId: Strap;
  strapName: string;
  displayName: string;
  displayNameColor: string;
}
