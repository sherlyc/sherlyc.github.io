import { HandlerInputType } from "./HandlerInputType";
import { Strap } from "../../strap";

export interface ITopStoriesHandlerInput {
  type: HandlerInputType.TopStories;
  strapName: string;
  color: string;
}
