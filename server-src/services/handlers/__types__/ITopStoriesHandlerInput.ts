import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ITopStoriesHandlerInput {
  type: HandlerInputType.TopStoriesExperiment;
  strapName: string;
  totalArticles: number;
}
