import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ISixImageHandlerInput {
  type: HandlerInputType.SixImage;
  displayName: string;
  color: string;
  linkUrl?: string;
  sourceId: Strap;
  strapName: string;
}
