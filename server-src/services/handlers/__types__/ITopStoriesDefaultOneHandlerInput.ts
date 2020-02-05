import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";
import { IRawArticle } from "../../adapters/__types__/IRawArticle";

export interface ITopStoriesDefaultOneHandlerInput {
  type: HandlerInputType.TopStoriesDefaultOneBigTopLeft;
  articles: IRawArticle[];
  strapName: string;
}
