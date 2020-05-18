import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2HandlerInput {
  type: HandlerInputType.TopStoriesV2;
  strapName: string;
  color: string;
}
