import { Strap } from "../../strap";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesHandlerInput {
  type: HandlerInputType.TopStories;
  strapName: string;
  color: string;
}
