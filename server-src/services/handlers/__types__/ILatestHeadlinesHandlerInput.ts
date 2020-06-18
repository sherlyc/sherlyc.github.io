import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ILatestHeadlinesHandlerInput {
  type: HandlerInputType.LatestHeadlines;
  sourceId: Strap;
  totalArticles: number;
  displayName: string;
  strapName: string;
  color: string;
}
