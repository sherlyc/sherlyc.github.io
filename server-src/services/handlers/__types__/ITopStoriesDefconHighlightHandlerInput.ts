import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesDefconHighlightHandlerInput {
  type: HandlerInputType.TopStoriesDefconHighlight;
  articles: IRawArticle[];
  strapName: string;
}
