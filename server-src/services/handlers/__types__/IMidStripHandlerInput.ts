import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface IMidStripHandlerInput {
  type: HandlerInputType.MidStrip;
  sourceId: Strap.MidStrip;
  strapName: string;
  totalArticles?: number;
}
