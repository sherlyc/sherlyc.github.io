import { HandlerInputType } from "./HandlerInputType";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

export interface ITopStoriesDefaultOneHighlightHandlerInput {
  type: HandlerInputType.TopStoriesDefaultOneHighlight;
  articles: IRawArticle[];
  strapName: string;
  color: string;
}
