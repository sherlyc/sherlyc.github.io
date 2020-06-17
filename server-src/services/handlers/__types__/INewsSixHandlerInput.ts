import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface INewsSixHandlerInput {
  type: HandlerInputType.NewsSix;
  displayName: string;
  color: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
