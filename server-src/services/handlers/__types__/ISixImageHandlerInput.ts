import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ISixImageHandlerInput {
  type: HandlerInputType.SixImage;
  displayName: string;
  color: string;
  linkUrl?: string;
  sourceId: Strap;
  strapName: string;
}
