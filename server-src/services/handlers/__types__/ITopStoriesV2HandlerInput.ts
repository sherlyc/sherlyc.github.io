import { AccentColor } from "../../../../common/__types__/AccentColor";
import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2HandlerInput {
  type: HandlerInputType.TopStoriesV2;
  strapName: string;
  midInsertContent: HandlerInput;
  lowerRightContent: HandlerInput;
}
