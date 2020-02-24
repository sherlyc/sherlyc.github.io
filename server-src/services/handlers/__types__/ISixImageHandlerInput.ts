import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ISixImageHandlerInput {
  type: HandlerInputType.SixImage;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  sourceId: Strap;
  strapName: string;
}
