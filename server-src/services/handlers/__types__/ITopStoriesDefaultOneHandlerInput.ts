import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

export interface ITopStoriesDefaultOneHandlerInput {
  type: HandlerInputType.TopStoriesDefaultOne;
  articles: IRawArticle[];
  strapName: string;
}
