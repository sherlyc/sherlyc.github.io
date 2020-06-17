import { IRawArticle } from "../../adapters/__types__/IRawArticle";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesDefaultOneHighlightHandlerInput {
  type: HandlerInputType.TopStoriesDefaultOneHighlight;
  articles: IRawArticle[];
  strapName: string;
  color: string;
}
