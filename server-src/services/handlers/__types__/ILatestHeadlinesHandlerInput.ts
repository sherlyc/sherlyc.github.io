import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ILatestHeadlinesHandlerInput {
  type: HandlerInputType.LatestHeadlines;
  sourceId: Strap;
  totalArticles: number;
  displayName: string;
  strapName: string;
  color: string;
}
