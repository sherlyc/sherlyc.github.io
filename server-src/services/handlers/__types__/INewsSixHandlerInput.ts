import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface INewsSixHandlerInput {
  type: HandlerInputType.NewsSix;
  displayName: string;
  displayNameColor: string;
  linkUrl?: string;
  strapName: string;
  sourceId: Strap;
}
