import { HandlerInputType } from "./HandlerInputType";
import { AccentColor } from "../../../../common/__types__/AccentColor";
import { HandlerInput } from "./HandlerInput";

export interface ITopStoriesV2HandlerInput {
  type: HandlerInputType.TopStoriesV2;
  strapName: string;
  color: AccentColor;
  midInsertContent: HandlerInput;
  lowerRightContent: HandlerInput;
}
