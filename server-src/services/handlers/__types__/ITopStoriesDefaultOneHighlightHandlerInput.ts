import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

export interface ITopStoriesDefaultOneHighlightHandlerInput {
  type: HandlerInputType.TopStoriesDefaultOneHighlight;
  articles: IRawArticle[];
  strapName: string;
}
