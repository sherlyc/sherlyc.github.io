import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IMidStripHandlerInput {
  type: HandlerInputType.MidStrip;
  sourceId: Strap.MidStrip;
  strapName: string;
  totalArticles?: number;
}
