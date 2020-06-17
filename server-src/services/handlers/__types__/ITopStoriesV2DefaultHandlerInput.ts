import { AccentColor } from "../../../../common/__types__/AccentColor";
import { HandlerInput } from "./HandlerInput";
import { HandlerInputType } from "./HandlerInputType";

export interface ITopStoriesV2DefaultHandlerInput {
  type: HandlerInputType.TopStoriesV2Default;
  strapName: string;
  color: AccentColor;
  midInsertContent: HandlerInput;
  lowerRightContent: HandlerInput;
}
