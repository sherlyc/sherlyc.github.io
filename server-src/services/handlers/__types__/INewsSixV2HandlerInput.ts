import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface INewsSixV2HandlerInput {
  type: HandlerInputType.NewsSixV2;
  displayName: string;
  color: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
