import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface IMiniMidStripHandlerInput {
  type: HandlerInputType.MiniMidStrip;
  sourceId: Strap.MiniMidStrip;
  strapName: string;
  totalArticles?: number;
}
